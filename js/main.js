// тёмный/светлый режим страницы 
$(document).ready(function(){
    $("#tooglenight").change(function() {
        if(this.checked) {
            $("#bd").addClass("night");
            $("i").css("color", "white");
        }else{
            $("#bd").removeClass("night");
            $("i").css("color", "black");
        }
    });
});
// тёмный/светлый режим страницы 



document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.querySelector('form');
    const searchInput = document.querySelector('input[name="s"]');

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const query = searchInput.value.toLowerCase();
       
        console.log('Поиск по запросу:', query);
    });
});

