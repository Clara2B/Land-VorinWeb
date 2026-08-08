/**
 * Modal genérico e acessível: qualquer botão com [data-modal-open="id"]
 * abre o overlay #id; qualquer elemento com [data-modal-close] dentro
 * dele fecha. Fecha também no clique fora e na tecla Esc, com foco
 * preso dentro do modal enquanto aberto e devolvido ao gatilho ao sair.
 */
export function initModals() {
  const openTriggers = document.querySelectorAll("[data-modal-open]");
  if (!openTriggers.length) return;

  let lastTrigger = null;

  function getFocusable(modal) {
    return Array.from(
      modal.querySelectorAll('a[href], button:not([disabled]), input, textarea, [tabindex]:not([tabindex="-1"])'),
    );
  }

  function openModal(overlay, trigger) {
    lastTrigger = trigger;
    overlay.dataset.open = "true";
    document.body.style.overflow = "hidden";
    const focusable = getFocusable(overlay);
    (focusable[0] ?? overlay).focus();

    function trap(event) {
      if (event.key === "Escape") {
        closeModal(overlay);
        return;
      }
      if (event.key !== "Tab") return;
      const items = getFocusable(overlay);
      if (!items.length) return;
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

    overlay._trapHandler = trap;
    overlay.addEventListener("keydown", trap);
  }

  function closeModal(overlay) {
    overlay.dataset.open = "false";
    document.body.style.overflow = "";
    if (overlay._trapHandler) overlay.removeEventListener("keydown", overlay._trapHandler);
    lastTrigger?.focus();
  }

  openTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const overlay = document.getElementById(trigger.dataset.modalOpen);
      if (overlay) openModal(overlay, trigger);
    });
  });

  document.querySelectorAll(".modal-overlay").forEach((overlay) => {
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) closeModal(overlay);
    });
    overlay.querySelectorAll("[data-modal-close]").forEach((closeBtn) => {
      closeBtn.addEventListener("click", () => closeModal(overlay));
    });
  });
}
