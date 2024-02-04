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
import PopularJobsCard from "../../common/cards/popular/PopularJobCard";
import styles from "./popularjobs.style";

import useFetch from "../../../hook/useFetch";



const Popularjobs = () => {

  const [selectedJob, setSelectedJob] = useState();

  const router = useRouter();

  const { data, isLoading, error } = useFetch( 'search', {
    query: "React developer",
    num_pages: 1
  });

  const handleCardPress = (item) => {
    router.push(`job-details/${item.job_id}`);
    setSelectedJob(item.job_id);
 }

  return (
    <View style={styles.container} >
      <View style={styles.header} >
        <Text style={styles.headerTitle} >Popular Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn} >Show all</Text>
        </TouchableOpacity>
      </View>
      <View  style={styles.cardsContainer}>
        {isLoading ?
          (<ActivityIndicator size="large" color={COLORS.primary} />)
          : error ? (<Text>Somthing wrong</Text>)
            : (
              <FlatList
                data={data}
                renderItem={({item}) => (
                  <PopularJobsCard item={item} selectedJob={selectedJob} handlerCardPress={ handleCardPress}/>
                )}
                keyExtractor={item=>item.index}
                horizontal
                contentContainerStyle={{ columnGap: SIZES.medium }}
                showsHorizontalScrollIndicator={false}
              />
            )
          }
      </View>
    </View>
  );
};

export default Popularjobs;
