document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.clothse_button');

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const detail = this.querySelector('.detail_en');
            detail.style.display = detail.style.display === 'block' ? 'none' : 'block';
        });
    });
});
