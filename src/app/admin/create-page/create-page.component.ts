import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Post} from '../../shared/interfaces';
import {PostsService} from '../../shared/posts.service';
import * as M from 'materialize-css/dist/js/materialize';

@Component({
    selector: 'app-create-page',
    templateUrl: './create-page.component.html',
    styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

    public form: FormGroup;

    constructor(
        private postsService: PostsService
    ) {
    }

    public ngOnInit(): void {
        this.form = new FormGroup({
            title: new FormControl(null, Validators.required),
            text: new FormControl(null, Validators.required),
            author: new FormControl(null, Validators.required),
            description: new FormControl(null, Validators.required)
        });
    }

    public submit(): void {
        if (this.form.invalid) {
            return;
        }

        const post: Post = {
            title: this.form.value.title,
            author: this.form.value.author,
            text: this.form.value.text,
            date: new Date(),
            description: this.form.value.description
        };

        this.postsService.create(post).subscribe(() => {
            this.form.reset();
            M.toast({html: 'The post was created'});
        });
    }

}
