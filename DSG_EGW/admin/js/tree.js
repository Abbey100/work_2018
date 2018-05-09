	//우클릭방지
	$(document).ready(function(){
		$('#tree').bind("contextmenu", function(e){return false;});
	});

	// --- Implement Cut/Copy/Paste --------------------------------------------
	var clipboardNode = null;
	var pasteMode = null;

	function copyPaste(action, node) {
		switch( action ) {
		case "cut":
		case "copy":
			clipboardNode = node;
			pasteMode = action;
			break;
		case "paste":
			if( !clipboardNode ) {
				alert("Clipoard is empty.");
				break;
			}
			if( pasteMode == "cut" ) {
				// Cut mode: check for recursion and remove source
				var isRecursive = false;
				var cb = clipboardNode.toDict(true, function(dict){
					// If one of the source nodes is the target, we must not move
					if( dict.key == node.data.key )
						isRecursive = true;
				});
				if( isRecursive ) {
					alert("Cannot move a node to a sub node.");
					return;
				}
				node.addChild(cb);
				clipboardNode.remove();
			} else {
				// Copy mode: prevent duplicate keys:
				var cb = clipboardNode.toDict(true, function(dict){
					dict.title = "Copy of " + dict.title;
					delete dict.key; // Remove key, so a new one will be created
				});
				node.addChild(cb);
			}
			clipboardNode = pasteMode = null;
			break;
		default:
			alert("Unhandled clipboard action '" + action + "'");
		}
	};

	// --- Contextmenu helper --------------------------------------------------
	function bindContextMenu(span) {
		// Add context menu to this node:
		$(span).contextMenu({menu: "myMenu"}, function(action, el, pos) {
			// The event was bound to the <span> tag, but the node object
			// is stored in the parent <li> tag
			var node = $.ui.dynatree.getNode(el);
			switch( action ) {
			case "cut":
			case "copy":
			case "paste":
				copyPaste(action, node);
				break;
			default:
				alert("Todo: appply action '" + action + "' to node " + node);
			}
		});
	};

	function editNode(node){
	var prevTitle = node.data.title,
		tree = node.tree;
	// Disable dynatree mouse- and key handling
	tree.$widget.unbind();
	// Replace node with <input>
	$(".dynatree-title", node.span).html("<input id='editNode' value='" + prevTitle + "'>");
	// Focus <input> and bind keyboard handler
	$("input#editNode")
		.focus()
		.keydown(function(event){
			switch( event.which ) {
			case 27: // [esc]
				// discard changes on [esc]
				$("input#editNode").val(prevTitle);
				$(this).blur();
				break;
			case 13: // [enter]
				// simulate blur to accept new value
				$(this).blur();
				break;
			}
		}).blur(function(event){
			// Accept new value, when user leaves <input>
			var title = $("input#editNode").val();
			node.setTitle(title);
			// Re-enable mouse and keyboard handlling
			tree.$widget.bind();
			node.focus();
		});
}

	// --- Init dynatree during startup ----------------------------------------
	$(function(){
		var isMac = /Mac/.test(navigator.platform);
		$("#tree").dynatree({
			//checkbox
			checkbox: true,
			selectMode: 3,

			//menu
			persist: true,
			onActivate: function(node) {
				$("#echoActivated").text(node.data.title + ", key=" + node.data.key);
			},
			onClick: function(node, event) {
				// Close menu on click
				if( $(".contextMenu:visible").length > 0 ){
					$(".contextMenu").hide();
				// return false;
				}
			},
			onKeydown: function(node, event) {
				// Eat keyboard events, when a menu is open
				if( $(".contextMenu:visible").length > 0 )
					return false;

				switch( event.which ) {

				// Open context menu on [Space] key (simulate right click)
				case 32: // [Space]
					$(node.span).trigger("mousedown", {
						preventDefault: true,
						button: 2
						})
					.trigger("mouseup", {
						preventDefault: true,
						pageX: node.span.offsetLeft,
						pageY: node.span.offsetTop,
						button: 2
						});
					return false;

				// Handle Ctrl-C, -X and -V
				case 67:
					if( event.ctrlKey ) { // Ctrl-C
						copyPaste("copy", node);
						return false;
					}
					break;
				case 86:
					if( event.ctrlKey ) { // Ctrl-V
						copyPaste("paste", node);
						return false;
					}
					break;
				case 88:
					if( event.ctrlKey ) { // Ctrl-X
						copyPaste("cut", node);
						return false;
					}
					break;
				}
			},
			/**/
			onCreate: function(node, span){
				bindContextMenu(span);
			},
			/**/
			onLazyRead: function(node){
				node.appendAjax({
					url: "sample-data2.json"
				});
			},

			//drag n drop
			dnd: {
				preventVoidMoves: true, // Prevent dropping nodes 'before self', etc.
				onDragStart: function(node) {
					return true;
				},
				onDragEnter: function(node, sourceNode) {
					if(node.parent !== sourceNode.parent)
						return false;
					return ["before", "after"];
				},
				onDrop: function(node, sourceNode, hitMode, ui, draggable) {
					sourceNode.move(node, hitMode);
				}
			},

			//edit
			//title: "Event samples",
			onClick: function(node, event) {
				if( event.shiftKey ){
					editNode(node);
					return false;
				}
			},
			onDblClick: function(node, event) {
				editNode(node);
				return false;
			},
			onKeydown: function(node, event) {
				switch( event.which ) {
				case 113: // [F2]
					editNode(node);
					return false;
				case 13: // [enter]
					if( isMac ){
						editNode(node);
						return false;
					}
				}
			}

		});
	});