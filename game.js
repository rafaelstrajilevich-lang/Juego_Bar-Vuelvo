let productos = [];
let puntaje = 0;
let errores = 0;
let productoCorrecto = null;

// Cargar JSON
fetch("/Juego_Bar-Vuelvo/data/productos_juego.json")
  .then(res => {
    if (!res.ok) throw new Error("No se pudo cargar el JSON");
    return res.json();
  })
 .then(data => {
  productos = data.flat(); // 👈 ESTA ES LA CLAVE
  console.log("Productos cargados:", productos.length);
  nuevaPregunta();
})
  .catch(err => {
    console.error("ERROR REAL:", err);
    alert("Error cargando los productos");
  });

  productoCorrecto = randomItem(productos);

  let opciones = productos
    .filter(p =>
      p.tipo === productoCorrecto.tipo &&
      p.nombre !== productoCorrecto.nombre
    )
    .sort(() => Math.random() - 0.5)
    .slice(0, 2);

  opciones.push(productoCorrecto);
  opciones.sort(() => Math.random() - 0.5);

  document.getElementById("ingredientes").innerHTML =
    "<strong>Ingredientes:</strong><br><br>• " +
    productoCorrecto.ingredientes.join("<br>• ");

  const contenedor = document.getElementById("opciones");
  contenedor.innerHTML = "";

  opciones.forEach(op => {
    const btn = document.createElement("button");
    btn.textContent = op.nombre;
    btn.onclick = () => verificar(op);
    contenedor.appendChild(btn);
  });

  actualizarEstado();
}

function verificar(opcion) {
  if (opcion.nombre === productoCorrecto.nombre) {
    puntaje++;
  } else {
    errores++;
  }
  nuevaPregunta();
}

function actualizarEstado() {
  document.getElementById("estado").textContent =
    `Puntaje: ${puntaje} | Errores: ${errores}/3`;
}

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];

}



