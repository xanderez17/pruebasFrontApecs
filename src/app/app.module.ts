import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EncabezadoComponent } from './components/encabezado/encabezado.component';
import { PiePaginaComponent } from './components/pie-pagina/pie-pagina.component';
import { CuerpoComponent } from './components/cuerpo/cuerpo.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ListarCursosComponent } from './components/dashboard/curso/listar-cursos/listar-cursos.component';
import { ListarContratosComponent } from './components/dashboard/contratos/listar-contratos/listar-contratos.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CrearContratoComponent } from './components/dashboard/contratos/crear-contrato/crear-contrato.component';
import { ListarParaleloComponent } from './components/dashboard/paralelo/listar-paralelo/listar-paralelo.component';
import { CrearParaleloComponent } from './components/dashboard/paralelo/crear-paralelo/crear-paralelo.component';
import { CrearDocenteComponent } from './components/dashboard/docente/crear-docente/crear-docente.component';
import { ListarDocentesComponent } from './components/dashboard/docente/listar-docentes/listar-docentes.component';
import { CrearInscripcionComponent } from './components/dashboard/alumno/crear-inscripcion/crear-inscripcion.component';
import { ListarEstudiantesComponent } from './components/dashboard/alumno/listar-estudiantes/listar-estudiantes.component';
import { CrearAulaComponent } from './components/dashboard/aula/crear-aula/crear-aula.component';
import { ListarAulasComponent } from './components/dashboard/aula/listar-aulas/listar-aulas.component';
import { CrearMatriculaComponent } from './components/dashboard/matricula/crear-matricula/crear-matricula.component';

import { CrearCatalogoComponent } from './components/dashboard/catalogo/crear-catalogo/crear-catalogo.component';
import { ListarCatalogoComponent } from './components/dashboard/catalogo/listar-catalogo/listar-catalogo.component';
import { ListarSucursalComponent } from './components/dashboard/sucursal/listar-sucursal/listar-sucursal.component';
import { CrearSucursalComponent } from './components/dashboard/sucursal/crear-sucursal/crear-sucursal.component';
import { HeaderComponent } from './components/header/header.component';
import { ListarMatriculasComponent } from './components/dashboard/matricula/listar-matriculas/listar-matriculas.component';
import { ListarRepresentanteComponent } from './components/dashboard/Representante/listar-representante/listar-representante.component';
import { CrearRepresentanteComponent } from './components/dashboard/Representante/crear-representante/crear-representante.component';
import { EditarRepresentanteComponent } from './components/dashboard/Representante/editar-representante/editar-representante.component';
import { CrearParentezcoComponent } from './components/dashboard/parentezco/crear-parentezco/crear-parentezco.component';
import { ListarParentezcoComponent } from './components/dashboard/parentezco/listar-parentezco/listar-parentezco.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './components/home/home.component';
import { CurosDocenteComponent } from './components/dashboard/curso/curos-docente/curos-docente.component';
import { CrearCursoComponent } from './components/dashboard/curso/crear-curso/crear-curso.component';
import { CrearAsistenciaComponent } from './components/dashboard/asistencia/crear-asistencia/crear-asistencia.component';
import { CrearAlumnoComponent } from './components/dashboard/alumno/crear-alumno/crear-alumno.component';
import { ListaInscripcionCursoComponent } from './components/dashboard/curso/lista-inscripcion-curso/lista-inscripcion-curso.component';
import { ListaMatriculaCursoComponent } from './components/dashboard/curso/lista-matricula-curso/lista-matricula-curso.component';
import { CrearCalificacionesComponent } from './components/dashboard/calificaciones/crear-calificaciones/crear-calificaciones.component';
import { MatriculaOPComponent } from './components/dashboard/matricula/matricula-op/matricula-op.component';
import { VerAlumnosComponent } from './components/dashboard/paralelo/ver-alumnos/ver-alumnos.component';
import { SafePipe } from './utils/safe.pipe';
import { ListarCategoriaComponent } from './components/dashboard/categoria/listar-categoria/listar-categoria.component';
import { NuevaCategoriaComponent } from './components/dashboard/categoria/nueva-categoria/nueva-categoria.component';
import { VerContratoComponent } from './components/dashboard/contratos/ver-contrato/ver-contrato.component';
import { FinalizadosComponent } from './components/dashboard/curso/finalizados/finalizados.component';
import { ListaCursosActualesComponent } from './components/dashboard/curso/lista-cursos-actuales/lista-cursos-actuales.component';
import { ListaInscritosActualesComponent } from './components/dashboard/Inscripciones/lista-inscritos-actuales/lista-inscritos-actuales.component';
import { CrearInscripcionCursoComponent } from './components/dashboard/Inscripciones/crear-inscripcion-curso/crear-inscripcion-curso.component';
import { ListarInscripcionComponent } from './components/dashboard/Inscripciones/listar-inscripcion/listar-inscripcion.component';

import { ReporteCalificacionesComponent } from './components/dashboard/calificaciones/reporte-calificaciones/reporte-calificaciones.component';

import { OPCrearInscripcionComponent } from './components/dashboard/Inscripciones/opcrear-inscripcion/opcrear-inscripcion.component';
import { OPVerMatriculaComponent } from './components/dashboard/Inscripciones/opver-matricula/opver-matricula.component';
import { ListarUsuariosComponent } from './components/dashboard/usuarios/listar-usuarios/listar-usuarios.component';
import { RegistrarUsuariosComponent } from './components/dashboard/usuarios/registrar-usuarios/registrar-usuarios.component';




@NgModule({
  declarations: [
    AppComponent,
    EncabezadoComponent,
    PiePaginaComponent,
    CuerpoComponent,
    LoginComponent,
    DashboardComponent,
    ListarCursosComponent,
    ListarContratosComponent,
    CrearCursoComponent,
    CrearParaleloComponent,
    ListarParaleloComponent,
    CrearContratoComponent,
    CrearInscripcionComponent,
    ListarEstudiantesComponent,
    ListarDocentesComponent,
    CrearDocenteComponent,
    CrearAulaComponent,
    ListarAulasComponent,
    CrearMatriculaComponent,
    CrearCatalogoComponent,
    ListarCatalogoComponent,
    ListarSucursalComponent,
    CrearSucursalComponent,
    HeaderComponent,
    ListarMatriculasComponent,
    ListarRepresentanteComponent,
    CrearRepresentanteComponent,
    EditarRepresentanteComponent,
    CrearParentezcoComponent,
    ListarParentezcoComponent,
    SidebarComponent,
    HomeComponent,
    CrearAlumnoComponent,
    CrearInscripcionCursoComponent,
    ListarInscripcionComponent,
    CrearAsistenciaComponent,
    CurosDocenteComponent,
    ListaInscripcionCursoComponent,
    ListaMatriculaCursoComponent,
    CrearCalificacionesComponent,
    MatriculaOPComponent,
    VerAlumnosComponent,
    SafePipe,
    ListarCategoriaComponent,
    NuevaCategoriaComponent,
    VerContratoComponent,
    FinalizadosComponent,
    ListaCursosActualesComponent,
    ListaInscritosActualesComponent,

    ReporteCalificacionesComponent,

    OPCrearInscripcionComponent,
      OPVerMatriculaComponent,
      ListarUsuariosComponent,
      RegistrarUsuariosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    SharedModule,
    BrowserAnimationsModule,

    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatTableModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
