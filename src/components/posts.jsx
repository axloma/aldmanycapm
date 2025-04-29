import React from 'react'
import { useState } from 'react'
import { nanoid } from 'nanoid'
const posts = () => {


    const [posts,setPosts] = useState([{post:">Acres of Diamonds… you’ve read the famous story, or at least had it related to you. A farmer",postpic:"image/blog/blog-1.jpg",date:"31st January,2018"},
                                      {post:">Acres of Diamonds… you’ve read the famous story, or at least had it related to you. A farmer",postpic:"image/blog/blog-2.jpg",date:"31st January,2018"},
                                      {post:">Acres of Diamonds… you’ve read the famous story, or at least had it related to you. A farmer",postpic:"image/blog/blog-3.jpg",date:"31st January,2018"}


                                      ])
  return (
   
    <section className="latest_blog_area section_gap">
    <div className="container">
        <div className="section_title text-center">
            <h2 className="title_color">latest posts from blog</h2>
            <p>The French Revolution constituted for the conscience of the dominant aristocratic class a fall from </p>
        </div>
        <div className="row mb_30">

       {/* TODO: handle generate posts  */}

       { posts.map((post,index)=>

            <div className="col-lg-4 col-md-6" key={nanoid()}>
            <div className="single-recent-blog-post">
                <div className="thumb">
                    <img className="img-fluid" src={post.postpic} alt="post"/>
                </div>
                <div className="details">
                    <div className="tags">
                        <a href="#" className="button_hover tag_btn">Travel</a>
                        <a href="#" className="button_hover tag_btn">Life Style</a>
                    </div>
                    <a href="#"><h4 className="sec_h4">Low Cost Advertising</h4></a>
                    <p>{[post.post]}.</p>
                    <h6 className="date title_color">{post.date}</h6>
                </div>	
            </div>
            </div>

       )
       }
        </div>
    </div>
</section>

  )
}

export default posts