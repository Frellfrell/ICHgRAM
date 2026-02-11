router.post("/", authMiddleware, upload.single("image"), createPost);
router.get("/", getAllPosts);
router.get("/user/:userId", getUserPosts);
router.get("/:postId", getPostById);
router.delete("/:postId", authMiddleware, deletePost);
