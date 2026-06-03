 <script src="https://smtpjs.com/v3/smtp.js"></script>

<script src="https://formspree.io/js/formbutton-v1.min.js" defer></script>


// pop up form submission for messages using  Formspree.io 
window.formbutton = window.formbutton || function () { (formbutton.q = formbutton.q || []).push(arguments) };
/* customize formbutton below*/
formbutton("create", {
  action: "https://formspree.io/f/mknlklpe",
  title: "Contact Form:",
  description: "Have a recommendation? Having issues with a link? Just want to say hello? Type away and click submit!",
  fields: [
    {
      type: "input",
      label: "Name:",
      name: "name",
      required: true,
      placeholder: "..."
    },
    {
      type: "email",
      label: "Email:",
      name: "email",
      required: true,
      placeholder: "..."
    },
    {
      type: "input",
      label: "Subject:",
      name: "Subject",
      required: true,
      placeholder: "..."
    },
    {
      type: "textarea",
      label: "Message:",
      name: "message",
      placeholder: "...",
    },
    { type: "submit" }
  ],
  styles: {
    title: {
      backgroundColor: "transparent",
      fontFamily: "Anton, monospace",
      textShadow: "0 0 100px black",

    },
    description: {
      backgroundColor: "transparent",
      borderTop: "1px solid aliceblue",
      paddingTop: "10px",
      fontFamily: "Bebas Neue, sans-serif",
      fontSize: '18px',
      textShadow: "0 0 100px black",
    },
    button: {
      backgroundImage: "url(https://i.pinimg.com/564x/1c/39/c8/1c39c81fccba10c48869ce903c533845.jpg)",
      backgroundSize: "cover",
      fill: "transparent",
      boxShadow: "0px 0px 10px aliceblue",
      cursor: "pointer",
      className: "form-button-hover",
    },
    shim: {
      backgroundColor: "#000000",
      backgroundImage: "url('gallery/contact-background.png')",
      backgroundSize: "cover"

    },
    label: {
      fontFamily: "Bebas Neue, sans-serif",
      color: "aliceblue",
      textShadow: "0 0 100px black",
    },
    input: {
      backgroundColor: "transparent",
      boxShadow: "inset 0 0 100px black, 0 0 5px aliceblue, 0 0 200px black",
      padding: "10px",
      fontFamily: "Bebas Neue, sans-serif",
      borderRadius: "25px",
      color: "aliceblue",
    },
    modal: {
      backgroundColor: "rgba(0, 0, 0, 1)",
      border: "1px solid aliceblue",
    },
    closeButton: {
      fill: "#ff4500",
      color: "#ff4500"
    },
  }
});

//show and hide the form button 

let hideFormbutton = function () {
  formbutton('showForm', false)
};

let showFormbutton = function () {
  formbutton('showForm', true)
  setTimeout(hideFormbutton, 2000)
};

let button = document.getElementById("showFormbutton").addEventListener('click', showFormbutton, false);
