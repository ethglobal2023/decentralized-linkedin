import SideBar from "../components/SideBar";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Image, Input } from "@chakra-ui/react";
import AssessmentList from "../components/AssessmentList";
import SortingMenuButtons from "../components/SortingMenuButtons";
import { AssessmentResultsListItems } from "../components/AssessmentList/style";
import QuizCard from "../components/QuizCard";
import { Page, NoResultFound } from "./style";
import allCoursesStorage from "../constants/allCoursesStorage";
import ProfileSide from "../components/ProfileSide";

const ALL_MENU_ITEMS_TITLE = "All";
const RECOMMENDED = "Location";
function SearchPage() {
  const [courses, setCourses] = useState(allCoursesStorage);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategoryItem, setActiveCategoryItem] = useState(RECOMMENDED);
  const courseCategories = [
    ALL_MENU_ITEMS_TITLE,
    ...new Set(allCoursesStorage.map((course) => course.category)),
  ];

  const searchQueryHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const target = event.target as HTMLInputElement;
    setSearchQuery(target.value);
  };

  useEffect(() => {
    let newCourses;

    if (activeCategoryItem === ALL_MENU_ITEMS_TITLE) {
      newCourses =
        searchQuery === ""
          ? allCoursesStorage
          : allCoursesStorage.filter((course) =>
              course.title.toLowerCase().includes(searchQuery.toLowerCase()),
            );
    } else {
      newCourses = allCoursesStorage.filter((course) => {
        return (
          (searchQuery !== ""
            ? course.title.toLowerCase().includes(searchQuery.toLowerCase())
            : course) && course.category === activeCategoryItem
        );
      });
    }

    setCourses(newCourses);
  }, [searchQuery, activeCategoryItem]);

  return (
    <div
      style={{
        display: "flex",
      }}>
      <SideBar />
      <div className="">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}>
          <ProfileSide />
          <AssessmentList
            description=""
            searchValue={searchQuery}
            onSearchInputChange={searchQueryHandler}
            sortingOptions={
              <SortingMenuButtons
                items={courseCategories}
                activeItem={activeCategoryItem}
                onItemClick={setActiveCategoryItem}
              />
            }>
            {!searchQuery ? (
              <>
                {courses.map((course) => (
                  <AssessmentResultsListItems key={course.title}>
                    <QuizCard
                      image={course.image}
                      title={course.title}
                      url={course.url}
                      description={course.description}
                    />
                  </AssessmentResultsListItems>
                ))}
              </>
            ) : (
              <NoResultFound>?</NoResultFound>
            )}
          </AssessmentList>
        </motion.div>
      </div>
    </div>
  );
}

export default SearchPage;
