router.post("/:postId", authMiddleware, addComment);
router.get("/:postId", getPostComments);
