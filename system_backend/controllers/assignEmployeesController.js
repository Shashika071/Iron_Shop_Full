import pool from "../config/db.js";

const assignEmployees = async (req, res) => {
    const { jobId, employeeIds } = req.body;

    if (!jobId || !Array.isArray(employeeIds) || employeeIds.length === 0) {
        return res.status(400).json({ success: false, message: "Invalid data" });
    }

    try {
        const values = employeeIds.flatMap(empId => [jobId, empId]);

        // Dynamically generate the placeholder string ( (job_id, employee_id), ... )
        const placeholders = employeeIds.map(() => "(?, ?)").join(", ");
        const sql = `INSERT INTO job_employees (job_id, employee_id) VALUES ${placeholders}`;

        await pool.query(sql, values);

        res.json({ success: true, message: "Employees assigned successfully" });
    } catch (err) {
        console.error("Error assigning employees:", err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const getAssignedEmployees = async (req, res) => {
    const { jobId } = req.body;

    if (!jobId) {
        return res.status(400).json({ success: false, message: "Job ID is required" });
    }

    try {
        const sql = `
            SELECT je.job_id, je.employee_id, e.name, e.position, COUNT(*) as assignments_count, MAX(je.assigned_at) as last_assigned_at
            FROM job_employees je
            JOIN employees e ON e.id = je.employee_id
            WHERE je.job_id = ?
            GROUP BY je.job_id, je.employee_id
            ORDER BY je.assigned_at DESC`;

        const [employees] = await pool.query(sql, [jobId]);

        res.json({ success: true, employees });
    } catch (err) {
        console.error("Error fetching assigned employees:", err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};



export  {getAssignedEmployees,assignEmployees}
