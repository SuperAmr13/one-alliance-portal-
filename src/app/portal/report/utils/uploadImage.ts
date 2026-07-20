export async function uploadImage(file: File): Promise<string> {
      const formData = new FormData();
        formData.append("file", file);

          const response = await fetch("/api/upload/report-images", {
              method: "POST",
                  body: formData,
                    });

                      const data = await response.json();

                        if (!response.ok) {
                            throw new Error(data.error ?? "Image upload failed.");
                              }

                                return data.path as string;
                                }
