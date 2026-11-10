"use strict";

const productos = [
    {
        id: 1,
        nombre: "Polera Oversize Rectángulo Áureo",
        categoria: "poleras",
        precioOriginal: 120.00,
        descuento: 10,
        imagen: "img/Poleras/Camiseta azul con espiral dorada.png",
        tallas: ["S","L", "XL"]
    },
    {
        id: 2,
        nombre: "Polera Básica de Pumpum",
        categoria: "poleras",
        precioOriginal: 120.00,
        descuento: 15,
        imagen: "img/Poleras/Camiseta blanca LYU STYLE con bordado minimalista.png",
        tallas: ["M","L", "XL"]
    },
    {
        id: 3,
        nombre: "Polera Estampado de Soul Eater",
        categoria: "poleras",
        precioOriginal: 120.00,
        descuento: 15,
        imagen: "img/Poleras/Camiseta blanca con calavera minimalista.png",
        tallas: ["M", "L", "XL"]
    },
    {
        id: 4,
        nombre: "Polera Estampado de Calcifer",
        categoria: "poleras",
        precioOriginal: 120.00,
        descuento: 15,
        imagen: "img/Poleras/Camiseta crema con logo de llama sonriente.png",
        tallas: ["M", "L", "XL"]
    },
    {
        id: 5,
        nombre: "Polera de La Luna(Soul Eater)",
        categoria: "poleras",
        precioOriginal: 140.00,
        descuento: 0,
        imagen: "img/Poleras/Camiseta negra con luna sonriente.png",
        tallas: ["S", "L", "XL"]
    },
    {
        id: 6,
        nombre: "Polera Cadenas de Kurapika(HxH)",
        categoria: "poleras",
        precioOriginal: 150.00,
        descuento: 0,
        imagen: "img/Poleras/Camiseta_negra_con_cadenas_plateadas_y_cruz-removebg-preview.png",
        tallas: ["S", "M", "L", "XL"]
    },
    {
        id: 7,
        nombre: "Polera 1.º Espada(Bleach)",
        categoria: "poleras",
        precioOriginal: 150.00,
        descuento: 0,
        imagen: "img/Poleras/Camiseta deportiva raglán blanca y negra.png",
        tallas: ["S", "M", "L", "XL"]
    },
    {
        id: 8,
        nombre: "Polera 3.º Espada(Bleach)",
        categoria: "poleras",
        precioOriginal: 150.00,
        descuento: 0,
        imagen: "img/Poleras/Camiseta deportiva menta con detalles verdes y 3.png",
        tallas: ["S", "M", "L", "XL"]
    },
    {
        id: 9,
        nombre: "Polera 4.º Espada(Bleach)",
        categoria: "poleras",
        precioOriginal: 150.00,
        descuento: 0,
        imagen: "img/Poleras/Camiseta negra deportiva con logo 4.png",
        tallas: ["S", "M", "L", "XL"]
    },
    {
        id: 10,
        nombre: "Polera 6.º Espada(Bleach)",
        categoria: "poleras",
        precioOriginal: 150.00,
        descuento: 0,
        imagen: "img/Poleras/Camiseta deportiva azul con número 6.png",
        tallas: ["S", "M", "L", "XL"]
    },
    // ------------Sudaderas/Suéteres------------
    {
        id: 11,
        nombre: "Sudadera de Shizuku(HxH)",
        categoria: "sudaderas",
        precioOriginal: 220.00,
        descuento: 20,
        imagen: "img/Sudaderas/Chaqueta negra de punto con cruces metálicas.png",
        tallas: ["S", "M", "L"]
    },
    {
        id: 12,
        nombre: "Sudadera con capucha de Jojo's",
        categoria: "sudaderas",
        precioOriginal: 200.00,
        descuento: 16,
        imagen: "img/Sudaderas/Hoodie negro con capucha estampada dorada.png",
        tallas: ["M", "L", "XL"]
    },
    {
        id: 13,
        nombre: "Sudadera con capucha de Killer Queen(Jojo's)",
        categoria: "sudaderas",
        precioOriginal: 200.00,
        descuento: 15,
        imagen: "img/Sudaderas/Sudadera Killer Queen en gris heather.png",
        tallas: ["S", "M", "XL"]
    },
    {
        id: 14,
        nombre: "Sudadera con capucha de Attack on Titan",
        categoria: "sudaderas",
        precioOriginal: 200.00,
        descuento: 0,
        imagen: "img/Sudaderas/Sudadera verde oliva con emblema alado.png",
        tallas: ["S", "M", "XL"]
    },
    {
        id: 15,
        nombre: "Sudadera de Kon(Chainsaw Man)",
        categoria: "sudaderas",
        precioOriginal: 180.00,
        descuento: 0,
        imagen: "img/Sudaderas/Sudadera de Mano y Rayas Abstractas.png",
        tallas: ["S", "M", "L"]        
    },
    {
        id: 16,
        nombre: "Suéter de Mista(Jojo's)",
        categoria: "sudaderas",
        precioOriginal: 220.00,
        descuento: 0,
        imagen: "img/Sudaderas/Suéter azul con entramado blanco.png",
        tallas: ["S", "M", "L"]
    },
    {
        id: 17,
        nombre: "Suéter de Arthur(Fire Force)",
        categoria: "sudaderas",
        precioOriginal: 210.00,
        descuento: 0,
        imagen: "img/Sudaderas/Suéter azul con estampado de goteo.png",
        tallas: ["S", "L", "XL"]
    },
    {
        id: 18,
        nombre: "Suéter de Killua(HxH)",
        categoria: "sudaderas",
        precioOriginal: 210.00,
        descuento: 0,
        imagen: "img/Sudaderas/Suéter marino con gráfico manga 99.png",
        tallas: ["M", "L", "XL"]
    },
    {
        id: 19,
        nombre: "Suéter 4to Angel(Evangelion)",
        categoria: "sudaderas",
        precioOriginal: 220.00,
        descuento: 0,
        imagen: "img/Sudaderas/Suéter oscuro con motivo fantasma rojo.png",
        tallas: ["S", "M", "L"]
    },
    {
        id: 20,
        nombre: "Suéter de Shinji(Bleach)",
        categoria: "sudaderas",
        precioOriginal: 180.00,
        descuento: 0,
        imagen: "img/Sudaderas/Suéter mostaza de cuello V.png",
        tallas: ["S", "M", "L"]
    },
    // ------------Chaquetas/Chamarra------------
    {
        id: 21,
        nombre: "Chaqueta de Attack on Titan",
        categoria: "chaquetas",
        precioOriginal: 300.00,
        descuento: 25,
        imagen: "img/Chaquetas/Chaqueta militar de lona con parches.png",
        tallas: ["S", "M", "XL"]        
    },
    {
        id: 22,
        nombre: "Chamarra con capucha de Itadori(Jujutsu Kaisen)",
        categoria: "chaquetas",
        precioOriginal: 300.00,
        descuento: 15,
        imagen: "img/Chaquetas/Chaqueta anorak bicolor con capucha acolchada.png",
        tallas: ["S", "L", "XL"]
    },
    {
        id: 23,
        nombre: "Chaqueta de Ichigo(Bleach)",
        categoria: "chaquetas",
        precioOriginal: 270.00,
        descuento: 20,
        imagen: "img/Chaquetas/Chaqueta bomber azul marino con escudo dorado.png",
        tallas: ["S", "M", "L", "XL"]
    },
    {
        id: 24,
        nombre: "Chamarra de Naruto",
        categoria: "chaquetas",
        precioOriginal: 310.00,
        descuento: 0,
        imagen: "img/Chaquetas/Chaqueta bomber roja con cuello crema.png",
        tallas: ["S", "M", "L", "XL"]
    },
    {
        id: 25,
        nombre: "Chaqueta con capucha de Quincy(Bleach)",
        categoria: "chaquetas",
        precioOriginal: 320.00,
        descuento: 0,
        imagen: "img/Chaquetas/Chaqueta cortaviento beige con capucha quilted.png",
        tallas: ["S", "M", "XL"]
    },
    {
        id: 26,
        nombre: "Chamarra con capuchade Berserk",
        categoria: "chaquetas",
        precioOriginal: 320.00,
        descuento: 0,
        imagen: "img/Chaquetas/Chaqueta cyberpunk negra con capucha de piel.png",
        tallas: ["S", "M", "L", "XL"]
    },
    {
        id: 27,
        nombre: "Chaqueta de Gaara(Naruto)",
        categoria: "chaquetas",
        precioOriginal: 320.00,
        descuento: 0,
        imagen: "img/Chaquetas/Chaqueta Cosplay Borgoña con Correas Grises.png",
        tallas: ["S", "M", "L", "XL"]
    },
    {
        id: 28,
        nombre: "Chaqueta de Fire Force",
        categoria: "chaquetas",
        precioOriginal: 310.00,
        descuento: 0,
        imagen: "img/Chaquetas/Chaqueta negra retro con franjas reflectantes.png",
        tallas: ["S", "M", "L", "XL"]
    },
    {
        id: 29,
        nombre: "Chamarra con capucha de Zoro",
        categoria: "chaquetas",
        precioOriginal: 320.00,
        descuento: 0,
        imagen: "img/Chaquetas/Chaqueta sherpa gótica con visor rojo.png",
        tallas: ["S", "M", "L", "XL"]
    },
    {
        id: 30,
        nombre: "Chaqueta Fire Force",
        categoria: "chaquetas",
        precioOriginal: 310.00,
        descuento: 0,
        imagen: "img/Chaquetas/Chaqueta táctica negra con detalles reflectantes.png",
        tallas: ["S", "M", "L", "XL"]
    },
    // ------------Pantalones/Jeans------------
    {
        id: 31,
        nombre: "Pantalón de Gyro Zeppeli(Jojo's)",
        categoria: "pantalones",
        precioOriginal: 250.00,
        descuento: 10,
        imagen: "img/Pantalones/Jeans grises con bordados distintivos.png",
        tallas: ["M", "L", "XL"]
    },
    {
        id: 32,
        nombre: "Pantalón de Ichigo(Bleach)",
        categoria: "pantalones",
        precioOriginal: 230.00,
        descuento: 10,
        imagen: "img/Pantalones/Jeans negros con diseños gráficos traseros.png",
        tallas: ["M", "L", "XL"]
    },
    {
        id: 33,
        nombre: "Pantalón de Polnareff(Jojo's)",
        categoria: "pantalones",
        precioOriginal: 230.00,
        descuento: 10,
        imagen: "img/Pantalones/Jeans_oscuros_con_parches_góticos.png",
        tallas: ["S", "M", "L"]
    },
    {
        id: 34,
        nombre: "Pantalón de Hisoka(HxH)",
        categoria: "pantalones",
        precioOriginal: 220.00,
        descuento: 0,
        imagen: "img/Pantalones/Jeans negros con bordados coloridos.png",
        tallas: ["S", "M", "L", "XL"]
    },
    {
        id: 35,
        nombre: "Pantalón de Kid Death(Soul Eater)",
        categoria: "pantalones",
        precioOriginal: 240.00,
        descuento: 0,
        imagen: "img/Pantalones/Vaqueros negros con bolsillos gráficos.png",
        tallas: ["S", "M", "L", "XL"]
    },
    {
        id: 36,
        nombre: "Pantalón de Johnny(Jojo's)",
        categoria: "pantalones",
        precioOriginal: 250.00,
        descuento: 0,
        imagen: "img/Pantalones/Vaqueros retro con parches estelares.png",
        tallas: ["S", "M", "XL"]
    },
    {
        id: 37,
        nombre: "Pantalón de Bucciarati(Jojo's)",
        categoria: "pantalones",
        precioOriginal: 250.00,
        descuento: 0,
        imagen: "img/Pantalones/Vaqueros índigo con paneles bordados.png",
        tallas: ["S", "L", "XL"]
    },
    {
        id: 38,
        nombre: "Pantalón de Grimmjow(Bleach)",
        categoria: "pantalones",
        precioOriginal: 240.00,
        descuento: 0,
        imagen: "img/Pantalones/Vaqueros góticos acid wash aislados.png",
        tallas: ["S", "M", "L", "XL"]
    }
].map(producto => ({
    ...producto,
    precio: Number(
        (
            producto.precioOriginal *
            (1 - producto.descuento / 100)
        ).toFixed(2)
    )
}));
