import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";

const fetchUserLinks = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  console.log("BASE URL:", BASE_URL);

  const response = await fetch(`${BASE_URL}/api/v1/links`, {
    method: "GET",
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) throw new Error(response.statusText);

  const data = await response.json();
  console.log("data",data);
  return data.links;
};

const UserLinks = () => {
  const {
    data: links,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["userLinks"],
    queryFn: fetchUserLinks,
    enabled: false,
  });
  const host = window.location.host
  const protocal = window.location.protocol
  const deleteLink = async (id: number) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_URL}/api/v1/link/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        ...(token && { authorization: token }),
      },
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to delete link");
    }
    refetch();
    // return data;
  };

  return (
    <div className="flex justify-center flex-col">
      <Button
        variant="secondary"
        className="mt-10 ml-10 w-30"
        onClick={() => refetch()}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Fetch My Links"}
      </Button>

      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}

      {Array.isArray(links) && links.length > 0 && (
        <table className="table-auto text-white border-white border-2 mx-10 my-20 px-96 ">
          <thead>
            <tr className="text-left border-2 border-white">
              <th className="px-4 py-2">Links</th>
              <th className="px-4 py-2">Original Url</th>
              <th className="px-4 py-2">Clicks</th>
            </tr>
          </thead>
          <tbody>
            {links.map((link: any) => (
              <tr
                key={link.id}
                className="border-2 border-white rounded-xl"
              >
                <td className="px-4 py-3">
                  <a
                    // TODO add hostaname , protocol
                    href={`${protocal}//${host}/${link.shortId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-blue-300"
                  >
                    {`${protocal}//${host}/${link.shortId}`}
                  </a>
                </td>
                <td className="px-4 py-3">
                  <a
                    href={link.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-blue-300"
                  >
                    {link.link}
                  </a>
                </td>
                <td className="px-4 py-3">{link.clicks?? "N/A"}</td>
                <td>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      deleteLink(link.id);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserLinks;
