/* ============================================================
   LEVEGHIN Contabilidade — captação de leads
   Handler único, compartilhado pelos 18 formulários do site.

   Princípios:
   - O lead é registrado no Formspree. WhatsApp e e-mail do
     visitante são canais de retorno, nunca o meio de registro.
   - A origem do lead vive em campos hidden no HTML, então
     sobrevive mesmo se este script não carregar.
   - Sem JavaScript o formulário ainda funciona: faz POST nativo
     e o _next devolve o visitante para /obrigado.html.
   - O WhatsApp só abre por clique do visitante, DEPOIS da
     confirmação de envio — nunca automaticamente.
   ============================================================ */
(function () {
  'use strict';

  var WA_NUMERO = '5598981380905';

  function init(form) {
    var btn = form.querySelector('[type="submit"]');
    var okBox = form.querySelector('[data-lead="sucesso"]');
    var errBox = form.querySelector('[data-lead="erro"]');
    var waBox = form.querySelector('[data-lead="whatsapp"]');
    var rotulo = btn ? btn.textContent : '';

    // origem_url: valor do HTML é o fallback; aqui gravamos a URL real,
    // que captura também parâmetros de campanha (utm_source etc.).
    var campoUrl = form.querySelector('input[name="origem_url"]');
    if (campoUrl) { campoUrl.value = window.location.href; }

    function esconder() {
      if (okBox) okBox.classList.remove('show');
      if (errBox) errBox.classList.remove('show');
      if (waBox) waBox.hidden = true;
    }

    function textoWhatsApp() {
      var d = new FormData(form);
      var nome = (d.get('nome') || '').toString().trim();
      var interesse = (d.get('interesse') || '').toString().trim();
      var partes = ['Olá! Acabei de enviar meus dados pelo site.'];
      if (nome) partes.push('Meu nome é ' + nome + '.');
      if (interesse) partes.push('Assunto: ' + interesse + '.');
      return partes.join(' ');
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      esconder();

      // Validação: usa a nativa do navegador e para no primeiro campo inválido.
      if (typeof form.checkValidity === 'function' && !form.checkValidity()) {
        if (typeof form.reportValidity === 'function') { form.reportValidity(); }
        return;
      }

      var dados = new FormData(form);
      if (btn) { btn.disabled = true; btn.textContent = 'Enviando…'; }

      fetch(form.action, {
        method: 'POST',
        body: dados,
        headers: { 'Accept': 'application/json' }
      }).then(function (r) {
        if (!r.ok) { throw new Error('Falha no envio'); }

        var querWhats = (dados.get('contato_preferido') || '') === 'WhatsApp';
        var link = 'https://wa.me/' + WA_NUMERO + '?text=' + encodeURIComponent(textoWhatsApp());

        if (okBox) {
          okBox.classList.add('show');
          if (typeof okBox.scrollIntoView === 'function') {
            okBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }

        // WhatsApp somente após a confirmação de envio, e somente por clique.
        // Abrir a janela automaticamente roubava o foco e o visitante nunca
        // via a mensagem de agradecimento — além de ser bloqueado por popup blocker.
        if (querWhats && waBox) {
          var a = waBox.querySelector('a');
          if (a) { a.href = link; }
          waBox.hidden = false;
        }

        form.reset();
        if (campoUrl) { campoUrl.value = window.location.href; }

        if (typeof gtag === 'function') {
          gtag('event', 'generate_lead', { method: 'formulario_site' });
        }
        if (typeof fbq === 'function') { fbq('track', 'Lead'); }
      }).catch(function () {
        if (errBox) {
          errBox.classList.add('show');
          if (typeof errBox.scrollIntoView === 'function') {
            errBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      }).finally(function () {
        if (btn) { btn.disabled = false; btn.textContent = rotulo; }
      });
    });
  }

  function iniciar() {
    var forms = document.querySelectorAll('form[data-lead-form]');
    for (var i = 0; i < forms.length; i++) { init(forms[i]); }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
})();
