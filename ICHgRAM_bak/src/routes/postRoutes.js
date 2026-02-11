router.post("/", authMiddleware, upload.single("image"), createPost);
router.get("/", getAllPosts);
