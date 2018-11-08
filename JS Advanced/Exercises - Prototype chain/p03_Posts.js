function solve() {
    class Post {
        constructor(title, content,) {
            this.title = title;
            this.content = content;
        }

        toString() {
            return `Post: ${this.title}\nContent: ${this.content}`;
        }
    }

    class SocialMediaPost extends Post {
        constructor(title, content, likes, dislikes) {
            super(title, content);
            this.likes = +likes;
            this.dislikes = +dislikes;
            this.comments = [];
        }

        addComment(comment) {
            this.comments.push(comment);
        }

        toString() {
            let rating = this.likes - this.dislikes;
            let result = super.toString() + `\nRating: ${rating}`
            if (this.comments.length > 0) {
                result = result + `\nComments:`
            }
            for (let comment of this.comments) {
                result = result + `\n * ${comment}`
            }

            return result;
        }
    }

    class BlogPost extends Post {
        constructor(title, content, views) {
            super(title, content);
            this.views = views;
        }

        view() {
            this.views++;
            return this;
        }

        toString() {
            let result = super.toString();
            result = result + `\nViews: ${this.views}`;
            return result;
        }
    }

    return {
        Post: Post,
        SocialMediaPost: SocialMediaPost,
        BlogPost: BlogPost
    };
}

let classes = solve();
let test = new classes.BlogPost("TestTitle", "TestContent", 5);
test.view().view().view();

console.log(test.toString());