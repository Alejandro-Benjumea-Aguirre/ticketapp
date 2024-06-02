const html = `
<!DOCTYPE html>
<html lang="e">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <style>
    .claseBoton{
      width: 30%;
      background-color: #fcae3b;
      border: 2px solid #fcae3b;
      color: black; 
      padding: 16px 32px;
      text-align: center;
      text-decoration: none;
      font-weight: bold;
      display: inline-block;
      font-size: 16px;
      margin: 4px 2px;
      transition-duration: 0.4s;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div>
    <div>
      <!-- Imagen inicial -->
      <div>
          <img src="/public/images/pretwor.png" alt="">
      </div>
      <!-- Imagen inicial -->

      <!-- Contenido principal -->
      <div>
          <h1>Titulo de la notificación</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipiscing elit augue, venenatis porta tellus bibendum 
              consequat ultricies nec fringilla sagittis, varius elementum et eget vel taciti blandit. Neque 
              fusce hac magna ligula ultricies gravida facilisi eget molestie, vivamus sodales ornare faucibus 
              sollicitudin netus mauris odio, tortor iaculis quisque penatibus convallis posuere nostra volutpat.
              Primis urna laoreet donec aliquet id placerat natoque fusce, habitant volutpat ridiculus at massa nullam eget, 
              penatibus parturient a in purus vulputate per. Erat cras elementum facilisi eleifend etiam cursus, mus sed dictum et justo, 
              penatibus fusce sociosqu aliquam conubia.
          </p>

          <!-- Gracias -->
          <p>Gracias por tu tiempo.</p>
          <p><i>Atentamente:</i><br>Equipo Pretwor</p>

          <!-- Botón -->
          <a class="claseBoton" href="https://www.pretwor.com/">Pretwor</a>
      </div>
      <!-- Contenido principal -->

      <!-- Footer -->
      <div>
        <!-- Redes sociales -->
        <a href="https://www.facebook.com/pretwor" class="contA"><img src="/public/images/fb.png" class="imag" /></a>
        <a href="https://www.instagram.com/pretwor/" class="contA"><img src="/public/images/ig.png" class="imag" /></a>
        <a href="https://wa.me/573224294332" class="contA"><img src="/public/images/wapp.png" class="imag" /></a>
        <a href="mailto:contacto@pretwor.com" class="contA"><img src="/public/images/em.png" class="imag" /></a>
        <!-- Redes sociales -->
        <h4>Soporte</h4>
        <p>
          Comunícate con nosotros por los siguientes medios:<br>
          Correo: <a class="afooter" href="mailto:proyectos@pretwor.com">proyectos@pretwor.com</a><br>
          Whatsapp: <a class="afooter" href="https://wa.me/573224294332">+57 322 429 4332</a><br>
        </p>
        <p>
          © 2022 Pretwor, todos los derechos reservados.
        </p>
      </div>
      <!-- Footer -->
    </div>
  </div>
</body>
</html>
`

exports.module = html
