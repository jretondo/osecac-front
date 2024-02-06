import index from "views/admin/dashboard"
import extractosBco from 'views/admin/extractosBco'
import conciliacionBco from 'views/admin/conciliacionBco'
import transferencias from 'views/admin/transferencias'
import adminUsu from 'views/admin/adminUsu'
import libroBco from 'views/admin/libroBco'
import pagoAgencias from 'views/admin/pagoAgencias'
import pagoPrestadores from 'views/admin/pagoPrestadores'
import pagoProveedores from 'views/admin/pagoProveedores'
import rendicionesCoseguro from 'views/admin/rendicionesCoseguro'
import remitosDep from 'views/admin/remitosDep'

let routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-blue",
    component: index,
    layout: process.env.PUBLIC_URL + "/admin",
    id: 10
  },
  {
    path: "/extractosBco",
    name: "Extractos Bancarios",
    icon: "ni ni-tag text-red",
    component: extractosBco,
    layout: process.env.PUBLIC_URL + "/admin",
    id: 3
  },
  {
    path: "/conciliacionBco",
    name: "Conciliación Bancaria",
    icon: "ni ni-tag text-red",
    component: conciliacionBco,
    layout: process.env.PUBLIC_URL + "/admin",
    id: 7
  },
  {
    path: "/transferencias",
    name: "Transferencias a Banco de Córdoba",
    icon: "ni ni-tag text-red",
    component: transferencias,
    layout: process.env.PUBLIC_URL + "/admin",
    id: 12
  },
  {
    path: "/libroBco",
    name: "Libro Banco",
    icon: "ni ni-tag text-red",
    component: libroBco,
    layout: process.env.PUBLIC_URL + "/admin",
    id: 2
  },
  {
    path: "/remitosDep",
    name: "Remitos de Depositos",
    icon: "ni ni-tag text-red",
    component: remitosDep,
    layout: process.env.PUBLIC_URL + "/admin",
    id: 11
  },
  {
    path: "/transfMasivas",
    name: "Transferencias masivas",
    icon: "ni ni-tag text-red",
    component: pagoAgencias,
    layout: process.env.PUBLIC_URL + "/admin",
    id: 5
  },
  {
    path: "/pagoPrestadores",
    name: "Pago a Prestadores",
    icon: "ni ni-tag text-red",
    component: pagoPrestadores,
    layout: process.env.PUBLIC_URL + "/admin",
    id: 6
  },
  {
    path: "/pagoProveedores",
    name: "Pago a Proveedores",
    icon: "ni ni-tag text-red",
    component: pagoProveedores,
    layout: process.env.PUBLIC_URL + "/admin",
    id: 4
  },
  {
    path: "/rendicionesCoseguro",
    name: "Rendiciones de Coseguro",
    icon: "ni ni-tag text-red",
    component: rendicionesCoseguro,
    layout: process.env.PUBLIC_URL + "/admin",
    id: 8
  },
  {
    path: "/adminUsu",
    name: "Administración de Usuarios",
    icon: "ni ni-tag text-red",
    component: adminUsu,
    layout: process.env.PUBLIC_URL + "/admin",
    id: 1
  }
];
export default routes;
