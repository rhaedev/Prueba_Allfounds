import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { New } from 'src/app/shared/models';
import { NewService } from 'src/app/shared/services';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator | undefined;
  @ViewChild(MatSort, { static: false}) sort: MatSort | undefined;

  news: New[] = [];
  title: string = '';
  public path: any = '';
  public searchForm: FormGroup;
  public dataSource: any;
  public displayedColumns = [
    "title",
    "description",
    "date",
    "content",
    "author",
    "buttons",
  ];

  public newDate = '';
  public newAuthor = '';
  public newTitle = '';

  constructor(
    private route: ActivatedRoute,
    private newService: NewService,
    private dialog: MatDialog,    
    private snackBar: MatSnackBar
  ) {
    this.searchForm = new FormGroup({
      title: new FormControl('', Validators.pattern('^[a-zA-Z ]+$')),
      author: new FormControl('', Validators.pattern('^[a-zA-Z ]+$')),
      date: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.path = this.route.snapshot.routeConfig?.path;
    this.listNews();
  }

  listNews(){
    let filter;

    switch (this.path) {
      case 'news':
        this.title = 'NOTICIAS';
        filter = { where: { archivedDate: { eq: null } } };
        break;
      case 'archived':
        this.title = 'ARCHIVADAS';
        filter = { where: { archivedDate: { neq: null } } };
        break;
      default:
        break;
    }
    
    this.newService.find(filter).subscribe(response => {
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = this.getFilterPredicate();
    })
  }

  getFilterPredicate() {
    return (row: New, filters: string) => {

      console.log('filters',filters);

      const filterArray = filters.split('$');
      const newDate = filterArray[0];
      const newAuthor = filterArray[1];
      const newTitle = filterArray[2];

      const matchFilter = [];

      const columnDate = new Date(row.date);
      const columnAuthor = row.author;
      const columnTitle = row.title;

      
      const customFilterNewDate = columnDate.toDateString().toLowerCase() >= newDate;
      const customFilterNewTitle = columnTitle.toLowerCase().includes(newTitle);
      const customFilterNewAuthor = columnAuthor.toLowerCase().includes(newAuthor);

      matchFilter.push(customFilterNewDate);
      matchFilter.push(customFilterNewTitle);
      matchFilter.push(customFilterNewAuthor);

      return matchFilter.every(Boolean);
    };
  }

  applyFilter() {
    const date = this.searchForm.get('date')!.value;
    const author = this.searchForm.get('author')!.value;
    const title = this.searchForm.get('title')!.value;

    this.newDate = (date === null || date === '') ? '' : new Date(date).toDateString();
    this.newTitle = title === null ? '' : title;
    this.newAuthor = author === null ? '' : author;

    const filterValue = this.newDate + '$' + this.newAuthor + '$' + this.newTitle;

    console.log('filterValue', filterValue);

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  resetFormFilter(){
    this.searchForm.reset();
    this.applyFilter();
  }

  achiveNewModal(newNew: New) {
    this.dialog.open(DialogComponent, {
      data: {
        message: `¿Estas seguro de archivar la noticia de ${newNew.author}?`,
        buttonText: {
          ok: "Archivar",
          cancel: "No",
        },
      },
    }).afterClosed().subscribe(result => {
      if (result) this.achiveNew(newNew)
    });
  }

  achiveNew(newNew: New) {
    newNew.archivedDate = new Date();
    console.log('newNew', newNew);
    this.newService.update(newNew, newNew.id).subscribe(response => {
      this.snackBar.open('Noticia archivada', 'Cerrar', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      } )
      this.listNews();
    })
  }

  deleteNewModal(id: string) {
    this.dialog.open(DialogComponent, {
      data: {
        message: '¿Esta seguro de borrar esta Noticia?',
        buttonText: {
          ok: "Borrar",
          cancel: "No",
        },
      },
    }).afterClosed().subscribe(result => {
      if (result) this.deleteNew(id)
    });
  }

  deleteNew(id: string) {
    this.newService.deleteById(id).subscribe((data) => {
        this.snackBar.open('Noticia eliminada', 'Cerrar', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        } )
        this.listNews();
      })
  }

}
