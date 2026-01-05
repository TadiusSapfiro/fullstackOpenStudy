```mermaid sequenceDiagram
    participant browser
    participant server

    Note right of browser: JS prevents default form submission behavior

    Note right of browser: JS creates note, adds to list, and rerenders the page

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note left of server: Server saves the note
    server-->>browser: 201 Created
    deactivate server

    Note right of browser: Browser stays on the same page (no reload)

```
