// Modo oscuro
document.getElementById('themeToggle').onclick = function () {
    document.body.classList.toggle('dark-mode');
    this.innerHTML = document.body.classList.contains('dark-mode')
        ? '<i class="fa fa-sun"></i>'
        : '<i class="fa fa-moon"></i>';
};

