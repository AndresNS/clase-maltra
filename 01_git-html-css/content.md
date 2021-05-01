# Clase 01: Git, Github, HTML, CSS

## Git

Git es un software de control de versiones. No es lo mismo que github, git es la herramienta de control de versiones y github es la plataforma que permite hostear tus repositorios en un entorno remoto y colaborar con otros desarroladores.

Cuando modificamos un archivo en nuestro directorio (Working directory) estará disponible para ser movido al Staging Area, que corresponde a los archivos que están listos para ser incluídos en un commit. Una vez definidos los archivos con los cambios que queremos conservar, hacemos un commit para almacenarlos en nuestro repositorio local, es decir, este commit y por ende, ese estado de los archivos en este punto quedarán registrados en la línea de tiempo del repositorio.

![git-architechture](./img/git-architecture.jpg)

### Configuración de Git

`git config --global user.name 'name'`
`git config --global user.email 'name@email.com'`

### Trabajando con git

Inicializar repositorio:
`git init`

Asociar repositorio remoto con el repositorio local:
`git remote add origin https://url.del.repositorio.git`

Ver archivos modificados desde el último commit:
`git status`

Agregar archivos modificados al staging area:
`git add .`
`git add ./ruta/de/archivo.txt`

Crear un commit con los cambios en el staging area:
`git commit -m 'mensaje de commit'`

Subir los cambios (que han sido incluidos en un commit) al repositorio remoto (Github). La opción `-u` es opcional y se usa para establecer esa rama como rama por defecto al hacer `git push` y `git pull`.
`git push origin -u <nombre_rama>`

## HTML

### Search engine optimization (SEO)

SEO es un proceso de optimización que se realiza a los sitios web con el fin de mejorar el posicionamiento en los motores de búsqueda (Google, Bing, DuckDuckGo, etc..). Existen 2 tipos, **SEO pagado** y **SEO orgánico**, el pagado, consiste en pagarle a un motor de búsqueda para posicionar un sitio web en los primeros lugares de los resultados cuando se realizan busquedas determinadas. Por otra parte, el SEO orgánico, consiste en construir el sitio web utilizando distintos recursos que son identificados y premiados por los motores de búsqueda otorgando un buen posicionamiento. Algunos de los factores que influyen en el SEO orgánico son:

- Uso correcto de las etiquetas HTML, como <header, `<nav>`, `<section>`, `<article>`, `<sidebar>`, `<footer>` y encabezados (`<h1>`, `<h2>`, `<h3>`, etc..)
- Utilización de etiquetas meta en el head de la página, como palabras clave.
- Relación entre el título de la página con el contenido de la página.
- Utilización de textos en negrita en palabras clave.
- Vinculos de páginas externas que dirigen hacia el sitio web.
- Uso de atributo `alt` en las imágenes.

### Valor semantico

Las mayoría de las etiquetas HTML tienen un valor semántico, lo que ayuda a entender la función que cumple una etiqueta determinada dentro de la página con el fin de ayudar a los motores de búsqueda y potenciar el SEO, así como para que los navegadores sepan interpretar de mejor manera el comportamiento del sitio web.

### Inline vs Block

Existen 2 etiquetas que no tienen valor semántico, que son la etiqueta `<div>` y la etiqueta `<span>`, pero que se diferencian en su comportamiento, que es definido por la propiedad CSS `display`. Existen distintos valores que puede tomar la propiedad `display`, pero hay 2 que son muy usados, que son `inline` y `block`. El resto de los valores disponibles puede ser consultado [aquí](https://www.w3schools.com/CSSref/pr_class_display.asp).

La etiqueta `<div>` tiene un comportamiento de tipo `block`, que
Inline vs Block (inline-block se comporta como elemento inline, pero recibe propiedades de un block padding, width, height, margin and padding only in x axis)
Divs vs Span

## CSS

Box Model
Relative Units

- em: The fontsize of the current element. (The value depends on the font size of the element that's applied to)
- rem: relative to font-size of the :root element (Ancestor of all elements, (html tag))
- vw, vh
  Flexbox

### Proyecto Clase 1

Copiar diseno https://playvalorant.com/ pero con contenido de otra cosa. O el mismo contenido
