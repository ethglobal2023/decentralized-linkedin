import { FC, useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { SupabaseContext } from "../contexts/SupabaseContext";
import { Link } from "react-router-dom";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../@/components/ui/avatar";
import { Card } from "../../@/components/ui/card";
import { Input } from "../../@/components/ui/input";
import "./Search.css";

const getImageUrls = () => {
  const getImageURL = (gender: string, n: number) =>
    `https://randomuser.me/api/portraits/${gender}/${n}.jpg`;

  const getImageURLs = (gender: string) => {
    const imageURLs = [];
    for (let i = 1; i <= 100; i++) {
      imageURLs.push(getImageURL(gender, i));
    }
    return imageURLs;
  };

  const womenImageURLs = getImageURLs("women");
  const menImageURLs = getImageURLs("men");
  return [...womenImageURLs, ...menImageURLs];
};

type SearchForm = {
  searchTerm: string;
};
export const Search: FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm<SearchForm>({});
  const supabase = useContext(SupabaseContext);
  const [error, setError] = useState("");
  const [data, setData] = useState<any[]>([]);
  const imageUrls = getImageUrls();

  const onSubmit: SubmitHandler<SearchForm> = async (data) => {
    const { searchTerm } = data;

    // const { data6, error6 } = await supabase.from('people_search').select("text").textSearch('text', `cat`)
    // const { data7, error7 } = await supabase.from('people_search').select("text").textSearch('text', `dog & cat`)
    // const { data8, error8 } = await supabase.from('people_search').select("text").textSearch('text', `'dog' & !'cat'`)
    const term = searchTerm
      .split(/[\s,]+/)
      .map((item) => item.trim())
      .join("&");
    console.log("Searching for: ", term);
    const { data: results, error } = await supabase
      .from("people_search")
      .select(
        `
                  pk,
                  json->"address",
                  json->"profileImage",
                  json->"preferredname",
                  json->"preferredtitle",
                  json->"preferredlocation"`,
      )
      .textSearch("text ", term);

    //TODO Make this search more robus

    console.log("results: ", results);

    if (error) {
      setError(JSON.stringify(error));
      return;
    }

    setData(results);
  };

  return (
    <div className={"p-4 space-y-2"}>
      <form onSubmit={handleSubmit(onSubmit)} className={"p-4 rounded"}>
        <Input type="text" placeholder="Search" {...register("searchTerm")} />
      </form>
      {data.map((user) => {
        console.log(user);
        const randomIndex = Math.floor(Math.random() * imageUrls.length);
        const randomImage = imageUrls[randomIndex];
        return (
          <Card
            key={user.pk}
            className="overflow-hidden bg-white rounded w-96 shadow-lg p-4  transition-transform transform hover:scale-105"
          >
            <Link
              className="flex items-center"
              to={`/TODO MAKE THIS LINK TO CHAT, USE user.pk OR user.address as key`}
            >
              <div className="flex items-center space-x-4">
                <Link
                  className="flex items-center space-x-4"
                  to={`/profile/${user.pk}`}
                >
                  <Avatar className="w-14 h-14">
                    <AvatarImage
                      src={user.profileImage || randomImage}
                      sizes={""}
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Link>
                <div className="flex flex-col">
                  <span className="text-xl">
                    {user.preferredname || user.address || "Anonymous User"}
                  </span>
                  <span className="text-sm text-gray-500 truncate w-72">
                    {user.preferredtitle?.trim()}
                  </span>
                </div>
              </div>
            </Link>
          </Card>
        );
      })}
    </div>
  );
};
