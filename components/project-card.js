const style = /* css */`
:host {
    font-size: .75rem;
}

.card {
    min-width: 3rem;
    min-height: 3rem;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 0.25rem 1.5rem rgba(0, 0, 0, 0.2);
    transition: 0.25s;
}

.card:hover {
    transform: scale(1.025);
    box-shadow: 0 0.25rem 1.75rem rgba(0, 0, 0, 0.15);
}

.card.linked {
    cursor: pointer;
}
`;

class PymbleProjectCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>${style}</style>
            <div id="project" class="card ${this.href ? "linked" : ""}">
                <slot class="content"></slot>
            </div>
        `;

        if (this.href) {
            this.shadowRoot.getElementById("project").addEventListener("click", () => {
                window.open(this.href, "_blank").focus();
            });
        }
    }

    // Attribute getters/setters
    static get observedAttributes() {
        return ["href"];
    }

    get href() {
        return this.getAttribute("href");
    }

    set href(value) {
        this.setAttribute("href", value);
    }
}

window.customElements.define("p-project", PymbleProjectCard);