/**
 * Formulário de contato: máscara de telefone, validação completa no
 * blur/submit e feedback visual. Sem envio para um backend real — ver o
 * aviso dentro do próprio formulário (index.html) e o comentário no
 * fim deste arquivo antes de usar em produção.
 */

const validators = {
  name: (value) => value.trim().length >= 3,
  company: () => true,
  phone: (value) => value.replace(/\D/g, "").length >= 10,
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
  message: (value) => value.trim().length >= 10,
};

function maskPhone(value) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits.replace(/^(\d*)/, "($1");
  if (digits.length <= 6) return digits.replace(/^(\d{2})(\d*)/, "($1) $2");
  if (digits.length <= 10) return digits.replace(/^(\d{2})(\d{4})(\d*)/, "($1) $2-$3");
  return digits.replace(/^(\d{2})(\d{5})(\d*)/, "($1) $2-$3");
}

function validateField(fieldWrap) {
  const input = fieldWrap.querySelector("input, textarea");
  const name = input?.name;
  if (!input || !validators[name]) return true;

  const valid = validators[name](input.value);
  fieldWrap.dataset.invalid = String(!valid && input.hasAttribute("required"));
  return valid || !input.hasAttribute("required");
}

export function initForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const phoneInput = form.querySelector("#field-phone");
  phoneInput?.addEventListener("input", (event) => {
    event.target.value = maskPhone(event.target.value);
  });

  const fields = Array.from(form.querySelectorAll(".form-field"));

  fields.forEach((fieldWrap) => {
    const input = fieldWrap.querySelector("input, textarea");
    input?.addEventListener("blur", () => validateField(fieldWrap));
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const results = fields.map(validateField);
    const firstInvalid = fields.find((fieldWrap) => fieldWrap.dataset.invalid === "true");

    if (firstInvalid) {
      firstInvalid.querySelector("input, textarea")?.focus();
      return;
    }

    if (!results.every(Boolean)) return;

    // TODO: conectar a um endpoint real (ex: Formspree, backend próprio,
    // integração com CRM) antes de publicar este template para um
    // cliente. Por padrão, o formulário só valida os dados no navegador
    // e exibe a confirmação abaixo — nada é enviado para lugar nenhum.
    const success = document.getElementById("formSuccess");
    if (success) success.hidden = false;
    form.reset();
    fields.forEach((fieldWrap) => (fieldWrap.dataset.invalid = "false"));
  });
}
