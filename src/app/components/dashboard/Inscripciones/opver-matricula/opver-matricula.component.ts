import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Matricula } from 'src/app/models/Matricula';
import { MatriculaService } from 'src/app/services/matricula.service';

@Component({
  selector: 'app-opver-matricula',
  templateUrl: './opver-matricula.component.html',
  styleUrls: ['./opver-matricula.component.css'],
})
export class OPVerMatriculaComponent implements OnInit {



  lista= new Matricula();
  constructor(
    public dialogRef: MatDialogRef<OPVerMatriculaComponent>,
    private matriculaServico: MatriculaService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.matriculaServico
      .buscarParaleloPorInscripcion(Number(this.data.anyProperty))
      .subscribe((m: any) => {
        this.lista = m;
             });
  }


  irLista(){
    this.dialogRef.close()
  }
}
