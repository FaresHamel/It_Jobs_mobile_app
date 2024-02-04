
import { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from "react-native";

import { SIZES, COLORS } from "../../../constants";
import NearByJobCard from "../../common/cards/nearby/NearbyJobCard";
import styles from "./nearbyjobs.style";

import useFetch from "../../../hook/useFetch";

const Nearbyjobs = () => {

 const router = useRouter();

 const { data, isLoading, error } = useFetch("search", {
   query: "React developer",
   num_pages: 1
 });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Somthing wrong</Text>
        ) : (
          data.map((job) => (
            <NearByJobCard
              job={job}
              key={job.job_id}
              handleNavigate={() => router.push(`job-details/${job.job_id}`)}
            
            />
          ))
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;