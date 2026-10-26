(function (VR) {
    const PROPERTY_ATTRS = new Set(["value", "checked", "selected", "disabled", "hidden"]);

    function h(tag, props = {}, ...children) {
        const el = document.createElement(tag);
        for (const [key, value] of Object.entries(props)) {
            if (value === null || value === undefined || value === false) continue;
            if (key === "class") el.className = value;
            else if (key === "text") el.textContent = value;
            else if (key.startsWith("on")) el.addEventListener(key.slice(2), value);
            else if (PROPERTY_ATTRS.has(key)) el[key] = value;
            else el.setAttribute(key, value === true ? "" : value);
        }
        append(el, children);
        return el;
    }

    function append(parent, children) {
        children.flat(Infinity).forEach(child => {
            if (child === null || child === undefined || child === false) return;
            parent.append(child.nodeType ? child : document.createTextNode(String(child)));
        });
    }

    // ícones estilo lucide, os paths são fixos

    const ICONS = {
        user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
        sliders:
            '<line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/>' +
            '<line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/>' +
            '<line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/>' +
            '<line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="16" x2="16" y1="18" y2="22"/>',
        refresh: '<path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/>',
        close: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>'
    };

    function icon(name) {
        const wrapper = document.createElement("span");
        wrapper.innerHTML =
            '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
            'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
            ICONS[name] +
            "</svg>";
        return wrapper.firstChild;
    }

    const TOAST_MS = 4000;

    function toast(message, kind = "info") {
        const container = document.getElementById("toast-container");
        if (!container) return;

        const item = h("div", { class: `toast toast-${kind}`, text: message });
        container.append(item);
        while (container.children.length > 3) container.firstElementChild.remove();

        setTimeout(() => {
            item.classList.add("leaving");
            setTimeout(() => item.remove(), 250);
        }, TOAST_MS);
    }

    const FOCUSABLE = 'button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const Modal = (() => {
        let active = null;
        let opener = null;
        let onClose = null;

        function open(modal, closeHandler) {
            if (active) close();
            active = modal;
            onClose = closeHandler || null;
            opener = document.activeElement;
            modal.classList.add("active");
            const first = modal.querySelector("[data-autofocus]") || modal.querySelector(FOCUSABLE);
            if (first) first.focus();
        }

        function close() {
            if (!active) return;
            const modal = active;
            const handler = onClose;
            active = null;
            onClose = null;
            modal.classList.remove("active");
            if (opener && document.contains(opener)) opener.focus();
            opener = null;
            if (handler) handler();
        }

        document.addEventListener("keydown", event => {
            if (!active) return;
            if (event.key === "Escape") {
                event.preventDefault();
                close();
            } else if (event.key === "Tab") {
                const items = [...active.querySelectorAll(FOCUSABLE)].filter(el => el.offsetParent !== null);
                if (items.length === 0) return;
                const first = items[0];
                const last = items[items.length - 1];
                if (event.shiftKey && document.activeElement === first) {
                    event.preventDefault();
                    last.focus();
                } else if (!event.shiftKey && document.activeElement === last) {
                    event.preventDefault();
                    first.focus();
                }
            }
        });

        document.addEventListener("mousedown", event => {
            if (active && event.target === active) close();
        });

        return { open, close };
    })();

    // se falhar tenta o fallback uma vez, depois esconde
    function setImage(img, src, fallback = "") {
        const url = src || fallback;
        img.hidden = !url;
        img.onerror = () => {
            img.onerror = null;
            if (fallback && url !== fallback) img.src = fallback;
            else img.hidden = true;
        };
        if (url && img.getAttribute("src") !== url) img.src = url;
    }

    VR.dom = { h, icon, toast, Modal, setImage };
})((window.VR = window.VR || {}));
