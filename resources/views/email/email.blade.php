<div class="Content">
    <h1>Courriel de vérification</h1>
    <p>Veuillez vérifier votre adresse e-mail à l'aide du lien ci-dessous :</p>
    <a href="{{ route('user.verify',$token) }}">Vérifier l'e-mail</a>

</div>

<style>
    .Content {
        display: flex;
        gap: 3px; /* Ajout de l'unité de mesure */
        text-align: center;
    }

    h1 {
        color: teal;
        text-align: center;
    }

    a {
        color: teal;
        border: 1px solid teal;
        background-color: transparent;
        padding: 2px; /* Ajout de l'unité de mesure */
        text-decoration: none; /* Ajout de la suppression de soulignement */
        display: inline-block; /* Ajout pour que le lien soit en ligne */
    }
</style>
