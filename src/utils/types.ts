export interface Post {
    title: string;
    slug: {
        current: string;
        _type: string;
    };
    publishedAt: string;
    mainImage: string;
    preview: string;
    /* eslint-disable @typescript-eslint/no-explicit-any */
    body: any;
    tags: Array<Tag>;
    _id: string;
    author: {
        _ref: string;
        _type: string;
        _id: string;
    }
}

export interface Tag {
    title: string;
    slug: {
        current: string;
    };
    _id: string;
    icon: any; /* eslint-disable @typescript-eslint/no-explicit-any */
}

export interface Author {
    _id: string;
    name: string;
    slug: {
        current: string;
        _type: string;
    };
    image: any; /* eslint-disable @typescript-eslint/no-explicit-any */
    bio: any; /* eslint-disable @typescript-eslint/no-explicit-any */
    _createdAt: string;
    _ref: string;
}

export interface MdxPost {
    title: string;
    slug: string;
    publishedAt: string;
    mainImage: string;
    preview: string;
    keywords: string[];
    author: string;
}