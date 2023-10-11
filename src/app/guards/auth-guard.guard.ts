import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalEmpresaService } from '../service/globalEmpresa/global-empresa.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  vista: string;
  constructor(
    private globalEmpresaService: GlobalEmpresaService,
    private router: Router,
    private modalService: NgbModal,) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      var uri = route.routeConfig;
      this.vista = String(uri?.path);
      if(this.vista == "inicio"){
        return true;
      }
      else{
        if (!this.globalEmpresaService.isAuthenticated()) {
          console.log("asddf")
          this.router.navigate(['inicio']);
          return false;
        }
        this.modalService.dismissAll();
        return true;
      }
      
  }
  
}
