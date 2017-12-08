numberOfPlayers=2;

function next(){
    document.getElementById("title-card").innerHTML="nombre de joueur";
    document.getElementById("text-card").innerHTML="faire un form";
    document.getElementById("submit-card").innerHTML='<a class="btn-floating btn-large waves-effect waves-light deep-orange" onclick="play()" > GO</a>';
}

function play(){
    document.getElementById("card").hidden=true;
    document.getElementById("jeu").style.opacity=1;
    // set number of Players
    createDivs();

}

function createDivs(){
    var stringHtml="";
    for(var i=0;i<numberOfPlayers;i++){
        stringHtml+=' <div class="row"> <div class="card deep-orange lighten-1"><div class="card-content white-text">';
        stringHtml+=' <span class="card-title" id="title-card">JOUEUR '+i+'</span>';
        stringHtml+='<p id="text-card">CO2 :<br> spent time : <br> spent monney : </p></div></div></div>';
    }
    document.getElementById("players").innerHTML=stringHtml;
    displayComparison("gnn","gnn");
}