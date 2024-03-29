import axios from "axios";
import { useState, useEffect, useRef } from "react";

const AddTableForm = ({ setInitFunc }) => {
  const branchRef = useRef();
  const CardinalityRef = useRef();
  const [branches, setBranches] = useState([]);
  const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const [error, setError] = useState({
    tablenum: "",
  });

  const getBranches = async () => {
    const branches = await axios.get("http://localhost:3000/branch");
    console.log(branches.data);
    setBranches(branches.data);
  };
  useEffect(() => {
    getBranches();
  }, []);

  return (
    <form
      className="w-full bg-White flex flex-col items-center gap-4"
      onSubmit={async (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        const table = {
          table_num: form.Table_Number.value,
          cardinality: Number.parseInt(CardinalityRef.current.value),
          branch_id: Number.parseInt(branchRef.current.value),
        };

        var x = 1;
        try {
          const res = await axios.post(
            "http://localhost:3000/table/inserttable",
            table
          );
        } catch {
          setError({
            tablenum: "Table Number is already exist in This Branch",
          });
          x = 0;
        }

        if (x === 1) setInitFunc("Access Tables");
      }}
    >
      <div className="flex flex-col gap-1">
        <input
          id="Table_Number"
          autoComplete="off"
          className="py-2 px-4 rounded-lg p text-Body border border-Body placeholder:text-Small outline-none w-[350px]"
          placeholder="Enter Table Number"
        />
        <label
          className={`${
            error.tablenum ? "block" : "hidden"
          } text-RedPrimary small`}
        >
          {error.tablenum}
        </label>
      </div>

      <select
        ref={CardinalityRef}
        className="flex max-w-[350px] justify-between items-center cursor-pointer px-4 py-2 border border-Body w-full rounded-lg appearance-none select"
        defaultChecked="Select Cardinality"
      >
        <option value="Select Cardinality" disabled>
          Select Cardinality
        </option>

        {options.map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>

      <select
        ref={branchRef}
        className="flex max-w-[350px] justify-between items-center cursor-pointer px-4 py-2 border border-Body w-full rounded-lg appearance-none select"
        defaultChecked="Select Branch"
      >
        <option value="Select Branch" disabled>
          Select Branch
        </option>
        {branches &&
          branches.map((branch) => (
            <option key={branch.loaction} value={branch.branch_id}>
              {branch.loaction}
            </option>
          ))}
      </select>

      <input
        type="submit"
        value="Add Table"
        className="cursor-pointer btn max-w-[350px]"
      />
    </form>
  );
};
export default AddTableForm;
