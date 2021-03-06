import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from '../../shared/posts.service';
import {Post} from '../../shared/interfaces';
import {Subscription} from 'rxjs';
import * as M from 'materialize-css/dist/js/materialize';

@Component({
    selector: 'app-dashboard-page',
    templateUrl: './dashboard-page.component.html',
    styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

    public posts: Post[] = [];
    public pSub: Subscription;
    public dSub: Subscription;
    public searchStr = '';

    constructor(
        private postsService: PostsService
    ) {
    }

    public ngOnInit(): void {
        this.pSub = this.postsService.getAll().subscribe(posts => {
            this.posts = posts;
        });
    }

    public remove(id: string): void {
        this.dSub = this.postsService.remove(id).subscribe(() => {
            this.posts = this.posts.filter(post => post.id !== id);
            M.toast({html: 'The post was deleted'});
        });
    }

    public ngOnDestroy(): void {
        if (this.pSub) {
            this.pSub.unsubscribe();
        }

        if (this.dSub) {
            this.dSub.unsubscribe();
        }
    }
}
