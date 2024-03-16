///////// It can use for fetching the user using return token
// To find the user after a successful login attempt you
export function getCandidateById({ id }) {
  // console.log("id", id);
  return new Promise(async (resolve) => {
    // console.log();
    const response = await fetch(
      `http://localhost:8081/MemberGovtOperation/GetcandidateById/` + id,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
      }
    );
    const dataA = await response.json();
    // console.log(dataA);
    // console.log("Fetched Top Produts:", data); // Add this line
    resolve({ data: { CandidateData: dataA } });
  });
}
