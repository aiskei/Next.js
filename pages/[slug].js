import React from "react";
import fs from "fs";
import path from "path";

//template for stat side generation
const Post = ({contents}) => {
    return  (
        <>
            {/* <div> The slug for this page is: {slug}</div> */}
            <div>Contents below</div>
            <pre>{contents}</pre>
        </>
    )

}

//static site generation from next.js to create the data path
export const getStaticPaths = async () => {
    //this will help us read the file
    const files = fs.readdirSync('posts');
    console.log("files: ", files);

    const paths =  files.map(filename =>({
        params: {
          slug: filename.replace(".md", "")
        }
      }));
      console.log("paths: ", paths)

    return {
        paths,
        fallback: false
    }
}

//function to fetch the content of the created the data
export const getStaticProps = async ({params: {slug}}) => {
    //to display the content in the slug
    //we need to read the file syncronosly
    //the reason for path.join is to join the path no matter what file syestem you are on
    const contents = fs.readFileSync(path.join("posts", slug + ".md")).toString();
    return {
        props: {
            contents,
        }
    }
}


export default Post;
