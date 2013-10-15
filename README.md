# Jalopy.js - A bare bones game framework

This project is a game engine without the engine.  It provides a solid entity component system while leaving rendering fully up to you.  This gives you the freedom to work directly with the canvas (or SVG or DOM) and optimize to your heart's desire.

## Components

### Component Events
These are the default events that are fired for all entities on all components.

<table>
    <tr>
        <th>Event</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>preRender</td>
        <td>Fired just before the entity is rendered on the screen at each step of the game</td>
    </tr>
    <tr>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td></td>
    </tr>
</table>

### Built In Components
<table>
    <tr>
        <th>Component</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>Draggable</td>
        <td>Allow the entity to be dragged with the mouse</td>
    </tr>
    <tr>
        <td>DragCreate</td>
        <td>Create and drag a new entity on drag (ala toolbar items)</td>
    </tr>
    <tr>
        <td>Bounded</td>
        <td>Prevent the entity from moving outside the canvas</td>
    </tr>
    <tr>
        <td></td>
        <td></td>
    </tr>
</table>




