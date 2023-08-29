const resourceTemplate = document.createElement('template');
resourceTemplate.innerHTML = `

function displayText() {
  var text = document.getElementById("textField");
  text.style.display = "block";
}


<style>
.wrapper .sidebar ul li a{
  display: block;
  padding: 13px 30px;
  border-bottom: 1px solid #10558d;
  color: rgb(241, 237, 237);
  font-size: 16px;
  position: relative;
}

.wrapper .sidebar ul li a .icon{
  color: #dee4ec;
  width: 30px;
  display: inline-block;
}


.wrapper .sidebar ul li a:hover,
.wrapper .sidebar ul li a.active{
  color: #0c7db1;

  background:white;
  border-right: 2px solid rgb(5, 68, 104);
}

.wrapper .sidebar ul li a:hover .icon,
.wrapper .sidebar ul li a.active .icon{
  color: #0c7db1;
}

.wrapper .sidebar ul li a:hover:before,
.wrapper .sidebar ul li a.active:before{
  display: block;
}
</style>

<div class="resource">
       <ul> 
       <li>
       <a href="https://www.w3schools.com/js/default.asp" target="_blank"--color:#1e9bff; class="active">
           <span class="icon"><i class="fas fa-home"></i></span>
           <span class="item">W3SCHOOLS</span>
       </a>
   </li>
   <li>
       <a href="https://discuss.codecademy.com/t/what-is-the-difference-between-printing-3-4-and-3-4/489337"
       target="_blank" style="--color: #ff1867;">
           <span class="icon"><i class="fas fa-desktop"></i></span>
           <span class="item">CODEACADEMY</span>
       </a>
   </li>
   <li>
       <a href="https://zzzcode.ai/code-explain" target="_blank"
       style="--color: #6eff3e;">
           <span class="icon"><i class="fas fa-user-friends"></i></span>
           <span class="item">CODE AI</span>
       </a>
   </li>
        </ul>
</div>
`

class resource extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
    }

    connectedCallback() {
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(resourceTemplate.content);
    }
}

customElements.define('resource-component', resource);