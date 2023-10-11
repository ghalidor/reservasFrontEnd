import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpUserEvent } from "@angular/common/http";
import { Injectable, Inject } from "@angular/core";
import { ToastrService } from 'ngx-toastr';
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { NgbModal, ModalDismissReasons ,NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(
        @Inject(DOCUMENT) private document: Document,
        private SpinnerService: NgxSpinnerService,
        private router: Router,private modalService: NgbModal,
        private toastr: ToastrService) { }

        intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
            // var informacion=JSON.parse(String(localStorage.getItem("usuario")));
            // var empresa_id=String(0);
            // if(informacion!=null){
            //   empresa_id= informacion.empresa_id;
            // }
            //console.log(empresa_id)
            const clonedreq = req.clone({
              headers: req.headers.set("Authorization", "Bearer " + localStorage.getItem('token'))
            });
        
            return next.handle(clonedreq).pipe(tap(
              succ => { 
        
                
              },
              err => {
                if (err.status === 401) {
                  //console.log(err.title+""+err.status);
                  this.toastr.clear();
                  this.toastr.error("No tiene Permiso,Comuniquese con el Administrador");
                  this.SpinnerService.hide();
                  console.log(this.router.url);
                  this.router.navigateByUrl('/inicio');
                //   setTimeout(() => {
                //     if (this.router.url == "/usuarioSala") {
                //       this.document.location.reload();
                //     }
                //   },
                //     900);
                  
                  //this.router.navigateByUrl('/login');
                }
                else if (err.status === 419) {
                  //console.log(err.title+""+err.status);
                  this.toastr.clear();
                  this.toastr.error("Su sesión expiró");
                  this.SpinnerService.hide();
                  this.modalService.dismissAll();
                  //const modalRef = this.modalService.open(MiniloginComponent,{size: 'sm' });
                  this.router.navigateByUrl('/inicio');
                }
                else {
                  this.toastr.error(err.message);
                  console.log("Error de Conexion")
                }
        
              }
            ))
        
        
            // const modifiedReq = req.clone({ 
            //   headers: req.headers.set('Authorization', `Bearer ${userToken}`)
            //   .set('usuario_id', '-1')
            //   .set('empresa_id', '-1'),
            // });
        
          }
}