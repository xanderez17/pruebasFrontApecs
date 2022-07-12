import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {CuerpoComponent} from "./components/cuerpo/cuerpo.component";
import { ListarCursosComponent } from './components/dashboard/curso/listar-cursos/listar-cursos.component';
import {ListarContratosComponent} from "./components/dashboard/contratos/listar-contratos/listar-contratos.component";
import { CrearCursoComponent } from './components/dashboard/curso/crear-curso/crear-curso.component';
import {CrearContratoComponent} from "./components/dashboard/contratos/crear-contrato/crear-contrato.component";
import { CrearParaleloComponent } from './components/dashboard/paralelo/crear-paralelo/crear-paralelo.component';
import { ListarParaleloComponent } from './components/dashboard/paralelo/listar-paralelo/listar-paralelo.component';
import { ListarEstudiantesComponent } from './components/dashboard/alumno/listar-estudiantes/listar-estudiantes.component';
import { ListarAulasComponent } from './components/dashboard/aula/listar-aulas/listar-aulas.component';
import { CrearAulaComponent } from './components/dashboard/aula/crear-aula/crear-aula.component';
import { CrearCatalogoComponent } from './components/dashboard/catalogo/crear-catalogo/crear-catalogo.component';
import { ListarCatalogoComponent } from './components/dashboard/catalogo/listar-catalogo/listar-catalogo.component';
import { ListarSucursalComponent } from './components/dashboard/sucursal/listar-sucursal/listar-sucursal.component';
import { CrearSucursalComponent } from './components/dashboard/sucursal/crear-sucursal/crear-sucursal.component';
import { CrearDocenteComponent } from './components/dashboard/docente/crear-docente/crear-docente.component';
import { ListarDocentesComponent } from './components/dashboard/docente/listar-docentes/listar-docentes.component';
import {CrearMatriculaComponent} from "./components/dashboard/matricula/crear-matricula/crear-matricula.component";
import {  ListarMatriculasComponent} from "./components/dashboard/matricula/listar-matriculas/listar-matriculas.component";

import { ListarRepresentanteComponent } from './components/dashboard/Representante/listar-representante/listar-representante.component';
import { EditarRepresentanteComponent } from './components/dashboard/Representante/editar-representante/editar-representante.component';
import { CrearParentezcoComponent } from './components/dashboard/parentezco/crear-parentezco/crear-parentezco.component';
import { ListarParentezcoComponent } from './components/dashboard/parentezco/listar-parentezco/listar-parentezco.component';


import { CrearAlumnoComponent } from './components/dashboard/alumno/crear-alumno/crear-alumno.component';
import { CrearInscripcionComponent } from './components/dashboard/alumno/crear-inscripcion/crear-inscripcion.component';
import { CrearAsistenciaComponent } from './components/dashboard/asistencia/crear-asistencia/crear-asistencia.component';
import { CurosDocenteComponent } from './components/dashboard/curso/curos-docente/curos-docente.component';
import { CrearCalificacionesComponent } from './components/dashboard/calificaciones/crear-calificaciones/crear-calificaciones.component';
import { ListarCategoriaComponent } from './components/dashboard/categoria/listar-categoria/listar-categoria.component';
import { AportesComponent } from './components/dashboard/aportes/aportes/aportes.component';
import { FinalizadosComponent } from './components/dashboard/curso/finalizados/finalizados.component';
import { ListaCursosActualesComponent } from './components/dashboard/curso/lista-cursos-actuales/lista-cursos-actuales.component';
import { CrearInscripcionCursoComponent } from './components/dashboard/Inscripciones/crear-inscripcion-curso/crear-inscripcion-curso.component';
import { ListarInscripcionComponent } from './components/dashboard/Inscripciones/listar-inscripcion/listar-inscripcion.component';
import { ListaInscritosActualesComponent } from './components/dashboard/Inscripciones/lista-inscritos-actuales/lista-inscritos-actuales.component';
import {ListarUsuariosComponent} from "./components/dashboard/usuarios/listar-usuarios/listar-usuarios.component";
import {
  RegistrarUsuariosComponent
} from "./components/dashboard/usuarios/registrar-usuarios/registrar-usuarios.component";

const routes: Routes = [
  {path: 'dashboard', redirectTo: 'inicio', pathMatch: 'full'},
  {path:'inicio', component:CuerpoComponent},

  {path:'dashboard/crear-curso/:idC',component:CrearCursoComponent},
  {path:'dashboard/editar-cursos/:id',component:CrearCursoComponent},
  {path:'dashboard/listar-cursos',component:ListarCursosComponent},
    {path:'dashboard/listar-cursos-actuales',component:ListaCursosActualesComponent},
  {path:'dashboard/listar-cursos-finalizados',component:FinalizadosComponent},


  {path:'dashboard/cursos-docente',component:CurosDocenteComponent},

  {path:'dashboard/listar-contratos',component:ListarContratosComponent},
  {path:'dashboard/crear-contrato',component:CrearContratoComponent},
  {path:'dashboard/editar-contrato/:id',component:CrearContratoComponent},

  {path:'dashboard/crear-aula',component:CrearAulaComponent},
  {path:'dashboard/editar-aula/:id',component:CrearAulaComponent},
  {path:'dashboard/listar-aulas',component:ListarAulasComponent},

  {path:'dashboard/crear-paralelo',component:CrearParaleloComponent},
  {path:'dashboard/editar-paralelo/:id',component:CrearParaleloComponent},
  {path:'dashboard/listar-paralelos',component:ListarParaleloComponent},

  {path:'inscripcion/:id',component:CrearInscripcionComponent},
  {path:'dashboard/crear-inscripcion',component:CrearInscripcionCursoComponent},
    {path:'dashboard/editar-inscripcion/:id',component:CrearInscripcionCursoComponent},
  {path:'dashboard/listar-inscripciones',component:ListarInscripcionComponent},
  {path:'dashboard/listar-inscripciones-actuales',component:ListaInscritosActualesComponent},

  {path:'dashboard/crear-alumno',component:CrearAlumnoComponent},
  {path:'dashboard/editar-alumno/:id',component:CrearAlumnoComponent},
  {path:'dashboard/listar-alumnos',component:ListarEstudiantesComponent},

  {path:'dashboard/crear-docente',component:CrearDocenteComponent},
  {path:'dashboard/editar-docente/:id',component:CrearDocenteComponent},
  {path:'dashboard/listar-docentes',component:ListarDocentesComponent},

  {path:'dashboard/crear-catalogo',component:CrearCatalogoComponent},
  {path:'dashboard/editar-catalogo/:id',component:CrearCatalogoComponent},
  {path:'dashboard/listar-catalogos',component:ListarCatalogoComponent},

  {path:'dashboard/crear-sucursal',component:CrearSucursalComponent},
  {path:'dashboard/editar-sucursal/:id',component:CrearSucursalComponent},
  {path:'dashboard/listar-sucursales',component:ListarSucursalComponent},

  {path:'dashboard/editar-matricula/:id',component:CrearMatriculaComponent},
  {path:'dashboard/listar-matriculas',component:ListarMatriculasComponent},

  {path:'dashboard/crear-contrato/:idM',component:CrearContratoComponent},
  {path:'dashboard/editar-contrato/:id',component:CrearContratoComponent},
  {path:'dashboard/listar-contato',component:ListarContratosComponent},


  {path:'dashboard/crear-representante',component:EditarRepresentanteComponent},

  {path:'dashboard/editar-representante/',component:EditarRepresentanteComponent},
  {path:'dashboard/editar-representante/:id',component:EditarRepresentanteComponent},
  {path:'dashboard/listar-representantes',component:ListarRepresentanteComponent},



  {path:'dashboard/crear-parentezco',component:CrearParentezcoComponent},
  {path:'dashboard/editar-parentezco/:id',component:CrearParentezcoComponent},
  {path:'dashboard/listar-parentezco',component:ListarParentezcoComponent},


  {path:'dashboard/crear-asistencia/:ic',component:CrearAsistenciaComponent},
  {path:'dashboard/control-aportes/:ic',component:AportesComponent},
  {path:'dashboard/crear-calificacion/:ic',component:CrearCalificacionesComponent},

  {path:'dashboard/listar-categorias', component:ListarCategoriaComponent},

  {path:'dashboard/listar-usuarios', component:ListarUsuariosComponent},
  {path:'dashboard/registrar-usuarios', component:RegistrarUsuariosComponent},

  {path: '**', redirectTo: 'inicio', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
