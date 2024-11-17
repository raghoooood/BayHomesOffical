'use client';
import { useState, useMemo } from "react";
import { Post } from "@/types";
import BlogContainer from "./BlogContainer";
import BlogCard from "./BlogCard";

interface Props {
  posts: Post[];
}

const BlogContent = ({ posts }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const postsPerPage = 9;

  // Extract unique categories from posts
  const uniqueCategories = useMemo(() => {
    const categories = new Set<string>();
    posts.forEach((post) => {
      post.categories.forEach((category) => categories.add(category.title));
    });
    return Array.from(categories);
  }, [posts]);

  // Filter posts by selected category
  const filteredPosts = selectedCategory
    ? posts.filter((post) =>
        post.categories.some((category) => category.title === selectedCategory)
      )
    : posts;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleCategoryClick = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to page 1 when a new category is selected
  };

  return (
    <BlogContainer className="px-4 sm:px-10">
      {/* Categories as clickable buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          className={`px-4 py-2 rounded-lg ${
            !selectedCategory ? "bg-orange-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => handleCategoryClick(null)} // Show all posts
        >
          All
        </button>
        {uniqueCategories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-lg ${
              selectedCategory === category ? "bg-orange-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentPosts.map((post) => (
          <BlogCard key={post?._id} post={post} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-10">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className={`px-4 py-2 mx-1 rounded-lg text-white ${
            currentPage === 1 ? "bg-gray-300" : "bg-orange-500 hover:bg-orange-400"
          } transition-colors duration-200`}
          disabled={currentPage === 1}
        >
          Back
        </button>

        <p className="text-gray-700 text-sm">
          Page {currentPage} of {totalPages}
        </p>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className={`px-4 py-2 mx-1 rounded-lg text-white ${
            currentPage === totalPages ? "bg-gray-300" : "bg-orange-500 hover:bg-orange-400"
          } transition-colors duration-200`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </BlogContainer>
  );
};

export default BlogContent;
