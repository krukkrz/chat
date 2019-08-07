import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from "./client/client.component";
import { HostComponent } from "./host/host.component";

const routes: Routes = [
    {path: '', redirectTo: 'client', pathMatch: 'full'},
    {path: 'client', component: ClientComponent },
    {path: 'host', component: HostComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)]
})
export class AppRouting{}