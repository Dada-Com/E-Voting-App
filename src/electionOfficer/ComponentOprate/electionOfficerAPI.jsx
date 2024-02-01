import { toast } from "react-toastify";

export function updateElectionCommissioner(data) {
  console.log("updateElectionCommissioner", data);
  return new Promise(async (resolve) => {
    try {
      const response = await fetch(
        `http://localhost:8080/EleCommisson/UpdateElectionCommissioner/` +
          data.id,
        {
          method: "PATCH",
          body: JSON.stringify(data),
          headers: { "content-type": "application/json" },
        }
      );
      const data2 = await response.json();
      console.log("Response from server:", data2); // Add this line to log the response
      if (response.ok) {
        toast.success("Update Successful");
      }
      resolve(data);
    } catch (error) {
      console.error(error);
      toast.error("Update Fail ");
    }
  });
}

///////// It can use for fetching the user using return token
export function getEleCommission({ id }) {
  // console.log("id", id);
  return new Promise(async (resolve) => {
    // console.log();
    const response = await fetch(
      `http://localhost:8080/EleCommisson/getEleCommission/` + id,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
      }
    );
    const dataA = await response.json();
    // console.log(dataA);
    // console.log("Fetched Top Produts:", data); // Add this line
    resolve({ data: { ElectionComission: dataA } });
  });
}
//
export const getAllCandidates = (pagination, filters) => {
  // Extract pagination parameters

  // console.log("===============>", pagination, filters);
  const page = pagination.page || 1;
  const pageSize = pagination.pageSize || 10;

  return new Promise(async (resolve) => {
    try {
      // Construct the query string
      let queryString = `page=${page}&pageSize=${pageSize}`;
      for (let key in filters) {
        if (key === "role" || key === "constituency" || key === "party") {
          queryString += `&${key}=${filters[key]}`;
        }
      }
      // console.log("For Candidate queryString " + queryString);
      // Fetch candidates with pagination and filters
      const response = await fetch(
        `http://localhost:8080/EleCommisson/getAllCandidate?${queryString}`
      );
      const data = await response.json();
      const totalCandidatesCOUNT = response.headers.get(
        "X-TotalCandidates-Count"
      );
      resolve({
        data: { candidates: data, totalCandidates: +totalCandidatesCOUNT },
      });
    } catch (error) {
      console.error("Error fetching candidates:", error);
      resolve({ data: { candidates: [], totalCandidates: 0 } });
    }
  });
};

export const getAllMinners = (pagination, filters) => {
  // Extract pagination parameters
  const page = pagination.page || 1;
  const pageSize = pagination.pageSize || 10;

  return new Promise(async (resolve) => {
    try {
      // Construct the query string
      let queryString = `?page=${page}&pageSize=${pageSize}`;
      for (let key in filters) {
        if (key === "role") {
          queryString += `&${key}=${filters[key]}`;
        }
      }

      // Fetch minners with pagination and filters
      const response = await fetch(
        `http://localhost:8080/EleCommisson/getAllMinner${queryString}`
      );
      const data = await response.json();
      const totalItems = response.headers.get("X-Total-Count");

      resolve({ data: { minners: data, totalItems: +totalItems } });
    } catch (error) {
      console.error("Error fetching minners:", error);
      resolve({ data: { minners: [], totalMinners: 0 } });
    }
  });
};

export const getAllVoters = (pagination, filter) => {
  // Extract pagination parameters
  const page = pagination._page || 1;
  const pageSize = pagination._limit || 10;
  let queryString = `?page=${page}&pageSize=${pageSize}`;
  // console.log(queryString);
  // Filter by Constituency
  if (filter.constituency) {
    queryString += `&constituency=${filter.constituency}`;
  }

  // Filter by Role
  if (filter.role) {
    queryString += `&role=${filter.role}`;
  }

  // console.log(queryString);
  return new Promise(async (resolve) => {
    try {
      const response = await fetch(
        `http://localhost:8080/EleCommisson/getAllVoter${queryString}`
      );
      const data = await response.json();
      const totalVoterS = response.headers.get("X-TotalVoter-Count");
      // console.log("data=========>", data);
      // console.log("totalItems=========>", totalVoterS);
      resolve({
        data: { voters: data, totalvoters: +totalVoterS },
      });
    } catch (error) {
      console.error("Error fetching voters:", error);
      resolve({ data: { voters: [], totalVoters: 0 } });
    }
  });
};

export function updateVoterRole({ id, roleD }) {
  return new Promise(async (resolve) => {
    try {
      const response = await fetch(
        `http://localhost:8080/EleCommisson/UpdateVoterRole/` + id,
        {
          method: "PATCH",
          body: JSON.stringify({ role: roleD }),
          headers: { "content-type": "application/json" },
        }
      );
      const data = await response.json();
      // console.log("Response from server:", data); // Add this line to log the response
      if (response.ok) {
        toast.success("Update Successfull");
      }
      resolve(data);
    } catch (error) {
      console.log(error);
      toast.error("Update Fail ");
    }
  });
}

export function updateCandidateRole({ id, roleD }) {
  return new Promise(async (resolve) => {
    try {
      const response = await fetch(
        `http://localhost:8080/EleCommisson/GiveRollToCandidate/` + id,
        {
          method: "PATCH",
          body: JSON.stringify({ role: roleD }),
          headers: { "content-type": "application/json" },
        }
      );
      const data = await response.json();
      // console.log("Response from server:", data); // Add this line to log the response
      if (response.ok) {
        toast.success("Update Successfull");
      }
      resolve({ data });
    } catch (error) {
      console.error(error);
      toast.error("Update Fail ");
    }
  });
}

export function updateMinnerRole({ id, roleD }) {
  console.log("Update Minner : " + id, roleD);
  return new Promise(async (resolve) => {
    try {
      const response = await fetch(
        `http://localhost:8080/EleCommisson/GiveRollToMinner/` + id,
        {
          method: "PATCH",
          body: JSON.stringify({ role: roleD }),
          headers: { "content-type": "application/json" },
        }
      );
      const resdata = await response.json();
      // console.log("Response from server:", data); // Add this line to log the response
      if (response.ok) {
        toast.success("Update Successfull");
      }
      resolve(resdata);
    } catch (error) {
      console.log(error);
      toast.error("Update Fail ");
    }
  });
}

export function deleteMinner({ id }) {
  return new Promise(async (resolve) => {
    try {
      const response = await fetch(
        `http://localhost:8080/EleCommisson/RemoveMinner/` + id,
        {
          method: "DELETE",
          headers: { "content-type": "application/json" },
        }
      );
      if (!response.ok) {
        toast.error("Already deleted");
      }
      const data = await response.json();
      // TODO: on server it will only return some info of user (not password)
      if (response.ok) {
        toast.success("Delete Successfull");
      } else {
        toast.error("Already deleted");
      }

      resolve({ data });
    } catch (error) {
      toast.error("Delete Fail");
      console.log(error);
      // Handle error, show an error toast, etc.
    }
  });
}

export function deleteCandidate({ id }) {
  return new Promise(async (resolve) => {
    try {
      const response = await fetch(
        `http://localhost:8080/EleCommisson/RemoveCandidate/` + id,
        {
          method: "DELETE",
          headers: { "content-type": "application/json" },
        }
      );
      const data = await response.json();
      // TODO: on server it will only return some info of user (not password)
      if (response.ok) {
        toast.success("Delete Successfull");
      } else {
        toast.error("Already deleted");
      }
      resolve({ data });
    } catch (error) {
      toast.error("Delete Fail");
      // console.log("Delete Fail");
      // Handle error, show an error toast, etc.
    }
  });
}

export function deleteVoter({ id }) {
  return new Promise(async (resolve) => {
    try {
      const response = await fetch(
        `http://localhost:8080/EleCommisson/RemoveVoter/` + id,
        {
          method: "DELETE",
          headers: { "content-type": "application/json" },
        }
      );
      const data = await response.json();
      // TODO: on server it will only return some info of user (not password)

      if (response.ok) {
        toast.success("Delete Successfull");
      } else {
        toast.error("Already deleted");
      }
      resolve({ data });
    } catch (error) {
      toast.error("Delete Fail@");
      console.log(error);
      // Handle error, show an error toast, etc.
    }
  });
}

////////****************AUTH ***************//////////////////////////////////////////////////////////////////////////

export function createEleCommission(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `http://localhost:8080/EleCommissonAuth/signup-candidate`,
      {
        method: "POST",
        body: JSON.stringify(userData),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}

export function createMinner(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `http://localhost:8080/EleCommissonAuth/Create-minner`,
      {
        method: "POST",
        body: JSON.stringify(userData),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}

export function loginEleCommission(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `http://localhost:8080/EleCommissonAuth/login-EleCommission`,
        {
          method: "POST",
          body: JSON.stringify(loginInfo),
          headers: { "content-type": "application/json" },
        }
      );
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
    // TODO: on server it will only return some info of user (not password)
  });
}

export function checkEleCommission() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `http://localhost:8080/EleCommissonAuth/check-EleCommission`
      );
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }

    // TODO: on server it will only return some info of user (not password)
  });
}

export function signOut() {
  return new Promise(async (resolve) => {
    // TODO: on server we will remove user session info
    resolve({ data: "success" });
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          `http://localhost:8080/EleCommissonAuth/logoutEleCommission`
        );
        if (response.ok) {
          resolve({ data: "success" });
        } else {
          const error = await response.text();
          reject(error);
        }
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  });
}
