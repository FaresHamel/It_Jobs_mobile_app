import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl
} from "react-native";
import { Stack, useRouter, useSearchParams } from "expo-router";
import { useState, useCalback } from "react";
import {
  ScreenHeaderBtn,
  Company,
  JobTabs,
  JobAbout,
  JobFooter,
  Specifics
} from "../../components";

import { COLORS, SIZES, icons } from "../../constants";
import useFetch from "../../hook/useFetch";
import Footer from "../../components/jobdetails/footer/Footer";


const tabs = ["About", "Qualifications", "Responsibilities"];




const JobDetails = () => {

    const parms = useSearchParams();
    const router = useRouter();
    
    //need to refrech to get needed data we need to refrech
    const [refreching, setRefreching] = useState(false);
    const [onRefresh, setOnrefrech] = useState([]);

    const [activeTab, setActiveTab] = useState(tabs[0]);
  
  //get Data from Externatl Api 
  const { data, isLoading, error, refetchData } = useFetch("job-details", {
    job_id: parms.id
  });



  // to show to the user the selected Tab
  const displayTabContent = () => {
  
    switch (activeTab) {
      case "Qualifications":
        return (
          <Specifics
            title="Qualifications"
            points={data[0].job_highlights?.Qualifications ??["N/A"]}
          />
        );

      case "About":
        return (
          <JobAbout info={data[0].job_description ?? "No data provided"} />
        );

      case "Responsibilities":
        return (
          <Specifics
            title="Responsibilities"
            points={data[0].job_highlights.Responsibilities ?? ["N/A"]}
          />
        );
      default:
        return null;
    }

}

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerTitle: "",
          headerStyle: {
            backgroundColor: COLORS.lightWhite
          },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension="60%" />
          )
        }}
      />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreching} onRefresh={onRefresh} />
        }
      >
        {isLoading ? (
          <ActivityIndicator size={"large"} color={COLORS.primary} />
        ) : error ? (
          <Text>Somthing Wrong</Text>
        ) : data.length === 0 ? (
          <Text>No Data</Text>
        ) : (
          <View style={{ paddingBottom1: 100, padding: SIZES.medium }}>
            <Company
              companyLogo={data[0].employer_logo}
              jobTitle={data[0].job_title}
              companyName={data[0].employer_name}
              location={data[0].job_country}
            />
            <JobTabs
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
                 />
                  
             {displayTabContent()}
          </View>
        )}
      </ScrollView>
      <Footer url={data[0]?.job_google_link ?? "https://careers.google.com/jobs.results"} />
    </SafeAreaView>
  );
};

export default JobDetails;
