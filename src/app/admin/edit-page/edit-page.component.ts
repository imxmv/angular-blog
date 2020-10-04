import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {PostsService} from '../../shared/posts.service';
import {switchMap} from 'rxjs/operators';
import {Post} from '../../shared/interfaces';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import * as M from 'materialize-css/dist/js/materialize';

@Component({
    selector: 'app-edit-page',
    templateUrl: './edit-page.component.html',
    styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {

    public form: FormGroup;
    public post: Post;
    public submitted = false;

    public uSub: Subscription;

    constructor(
        private route: ActivatedRoute,
        private postsService: PostsService
    ) {
    }

    public ngOnInit(): void {
        this.route.params.pipe(
            switchMap((params: Params) => {
                return this.postsService.getById(params.id);
            })
        ).subscribe((post: Post) => {
            this.post = post;
            this.form = new FormGroup({
                title: new FormControl(post.title, Validators.required),
                text: new FormControl(post.text, Validators.required),
                description: new FormControl(post.description, Validators.required)
            });
        });
    }

    public ngOnDestroy(): void {
        if (this.uSub) {
            this.uSub.unsubscribe();
        }
    }

    public submit(): void {
        if (this.form.invalid) {
            return;
        }

        this.submitted = true;

        this.uSub = this.postsService.update({
            ...this.post,
            text: this.form.value.text,
            title: this.form.value.title,
            description: this.form.value.description
        }).subscribe(() => {
            this.submitted = false;
            M.toast({html: 'The post has been updated'});
        });
    }
}
