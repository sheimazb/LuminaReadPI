import { useState, useEffect } from "react";
import {
    Flex,
    Text,
    Image,
    Button,
    Textarea,
    Spinner,
    Skeleton,
} from "@chakra-ui/react";
import { FaCommentAlt } from "react-icons/fa";
import axios from "axios";

const Forum = () => {
    const [comments, setComments] = useState<any[]>([]);
    const [newComment, setNewComment] = useState("");
    const [addingComment, setAddingComment] = useState(false);
    const [deleteLoadingStates, setDeleteLoadingStates] = useState<{
        [key: number]: boolean;
    }>({});
    const [loadingComments, setLoadingComments] = useState(true);
    const [editCommentId, setEditCommentId] = useState<number | null>(null);
    const [editLoadingStates, setEditLoadingStates] = useState<{
        [key: number]: boolean;
    }>({});

    const fetchData = async () => {
        try {
            const urlParts = window.location.pathname.split("/");
            const lastId = urlParts[urlParts.length - 2]; // Assuming the ID is the second last part of the URL

            const response = await fetch(
                `http://127.0.0.1:8000/api/novellas/${lastId}/comments`
            );
            const data = await response.json();
            setComments(data.comments);
        } catch (error) {
            console.error("Error fetching comments:", error);
        } finally {
            setLoadingComments(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const formatDate = (dateString: any) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };
    const handleAddComment = async () => {
        try {
            setAddingComment(true);
            const urlParts = window.location.pathname.split("/");
            const lastId = urlParts[urlParts.length - 2]; // Assuming the ID is the second last part of the URL
            const token = localStorage.getItem("token"); // Récupérer le token JWT depuis le stockage local
            // Assurez-vous que novella_id est un nombre entier
            const novellaId = parseInt(lastId);
            if (isNaN(novellaId)) {
                throw new Error("Invalid novella ID");
            }

            const commentData = {
                novella_id: novellaId,
                content: newComment,
            };

            // Utilisez la méthode post d'axios pour envoyer la requête POST
            const response = await axios.post(
                `http://127.0.0.1:8000/api/Addcomments`,
                commentData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log(response.data); // Afficher la réponse du backend
        } catch (error) {
            console.error("Erreur lors de l'ajout de commentaire:", error);
        } finally {
            setAddingComment(false); // Assurez-vous de désactiver l'indicateur d'ajout de commentaire en cas d'erreur ou de réussite
        }
    };

    const handleDeleteComment = async (id: number) => {
        try {
            setDeleteLoadingStates((prevState) => ({
                ...prevState,
                [id]: true,
            }));

            const response = await axios.delete(
                `http://127.0.0.1:8000/api/comments/${id}`
            );
            if (response.status === 200) {
                fetchData();
            } else {
                console.error("Failed to delete comment");
            }
        } catch (error) {
            console.error("Error deleting comment:", error);
        } finally {
            setDeleteLoadingStates((prevState) => ({
                ...prevState,
                [id]: false,
            }));
        }
    };

    const handleEditComment = async (id: number, updatedContent: string) => {
        try {
            setEditLoadingStates((prevState) => ({
                ...prevState,
                [id]: true,
            }));

            const response = await axios.put(
                `http://127.0.0.1:8000/api/comments/${id}`,
                {
                    content: updatedContent,
                }
            );
            if (response.status === 200) {
                // Update the local state with the updated comment content
                setComments((prevComments) =>
                    prevComments.map((comment) =>
                        comment.id === id
                            ? { ...comment, content: updatedContent }
                            : comment
                    )
                );
            } else {
                console.error("Failed to update comment");
            }
        } catch (error) {
            console.error("Error updating comment:", error);
        } finally {
            setEditLoadingStates((prevState) => ({
                ...prevState,
                [id]: false,
            }));
            setEditCommentId(null);
        }
    };

    return (
        <Flex justifyContent={"space-between"} gap={3}>
            <Flex
                w={"100%"}
                p={3}
                rounded={10}
                flexDirection={"column"}
                gap={3}
            >
                <Flex alignItems={"center"} gap={3}>
                    <FaCommentAlt /> <Text>{comments.length} Comments</Text>
                </Flex>
                <Flex flexDirection={"column"} gap={1}>
                    <Text fontSize={"sm"}>Comment as Saif Eddine Jelassi</Text>
                    <Textarea
                        placeholder="Write your comment here"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <Button
                        size={"sm"}
                        onClick={handleAddComment}
                        disabled={addingComment}
                    >
                        {addingComment ? <Spinner size="sm" /> : "Add Comment"}
                    </Button>
                </Flex>
                {loadingComments ? (
                    <Flex flexDirection={"column"} gap={3}>
                        <Skeleton height="100px" rounded={8} />
                        <Skeleton height="100px" rounded={8} />
                        <Skeleton height="100px" rounded={8} />
                    </Flex>
                ) : (
                    comments.map((comment: any) => (
                        <Flex
                            key={comment.id}
                            alignItems={"start"}
                            gap={3}
                            mt={2}
                        >
                            <Image
                                src="https://i.gyazo.com/83ece1f06f397ab5928a6b9944a27146.png"
                                h={"30px"}
                                w={"30px"}
                                rounded={"50%"}
                            />
                            <Flex flexDirection={"column"} w={"100%"}>
                                <Flex gap={1} alignItems={"center"}>
                                    <Text as="b">{comment.user.name}</Text>
                                    <Text fontSize={"sm"}>
                                        {formatDate(comment.created_at)}
                                    </Text>
                                </Flex>
                                {editCommentId === comment.id ? (
                                    <Textarea
                                        w={"100%"}
                                        value={comment.content}
                                        onChange={(e) =>
                                            setComments((prevComments) =>
                                                prevComments.map((c) =>
                                                    c.id === comment.id
                                                        ? {
                                                              ...c,
                                                              content:
                                                                  e.target
                                                                      .value,
                                                          }
                                                        : c
                                                )
                                            )
                                        }
                                    />
                                ) : (
                                    <Text color={"gray.400"}>
                                        {comment.content}
                                    </Text>
                                )}
                                <Flex gap={2}>
                                    {editCommentId === comment.id ? (
                                        <Button
                                            mt={2}
                                            size={"xs"}
                                            colorScheme="blue"
                                            variant={"outline"}
                                            onClick={() => {
                                                handleEditComment(
                                                    comment.id,
                                                    comment.content
                                                );
                                                setEditCommentId(null);
                                            }}
                                            disabled={
                                                editLoadingStates[comment.id]
                                            }
                                        >
                                            {editLoadingStates[comment.id] ? (
                                                <Spinner size="xs" />
                                            ) : (
                                                "Save"
                                            )}
                                        </Button>
                                    ) : (
                                        <Button
                                            mt={2}
                                            size={"xs"}
                                            onClick={() =>
                                                setEditCommentId(comment.id)
                                            }
                                            disabled={editCommentId !== null}
                                        >
                                            Edit
                                        </Button>
                                    )}
                                    <Button
                                        mt={2}
                                        size={"xs"}
                                        colorScheme="red"
                                        variant={"outline"}
                                        onClick={() =>
                                            handleDeleteComment(comment.id)
                                        }
                                        disabled={
                                            deleteLoadingStates[comment.id]
                                        }
                                    >
                                        {deleteLoadingStates[comment.id] ? (
                                            <Spinner size="xs" />
                                        ) : (
                                            "Delete"
                                        )}
                                    </Button>
                                </Flex>
                            </Flex>
                        </Flex>
                    ))
                )}
            </Flex>
            <Flex
                w={"350px"}
                border={"var(--bordercolor) solid 1px"}
                p={3}
                rounded={10}
            >
                News
            </Flex>
        </Flex>
    );
};

export default Forum;
