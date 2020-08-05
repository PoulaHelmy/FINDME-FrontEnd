import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from '@@shared/pages/not-found/not-found.component';
import { ChatMainComponent } from './pages/chat-main/chat-main.component';
import { ChatDetailsResolver } from '@@core/guards/resolvers/Chats/chat-details.resolver';

const routes: Routes = [
  {
    path: ':id',
    component: ChatMainComponent,
    resolve: { item: ChatDetailsResolver },
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatsRoutingModule {}
