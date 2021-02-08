const connection = require('./connection');

class DB {
    constructor(connection) {
        this.connection = connection
    }
    // -----------------------------
    viewAllDepartments() {
        return this.connection.query(
            
            `
            SELECT
                department.id,
                department.name
            FROM
                department
            `
        )
    };

    viewAllRoles() {
        return this.connection.query(
            `
            SELECT
                role.id,
                role.title,
                role.salary,
                department.name AS department
            FROM
                role
            LEFT JOIN
                department ON
                role.department_id = department.id
            `
        )
    };

    viewAllEmployees() {
        return this.connection.query(
            `
            SELECT
				employee.id,
                employee.first_name AS first,
                employee.last_name AS last,
                role.title,
                department.name AS department,
                role.salary,
                manager.first_name AS manager_first,
                manager.last_name AS manager_last
            FROM
                employee
            LEFT JOIN
                employee AS manager ON
                employee.manager_id = manager.id
            LEFT JOIN
                role ON
                employee.role_id = role.id
            LEFT JOIN
				department ON
			    department.id = role.department_id;
            `
        )
    };

    // -----------------------------
    createDepartment(department) {
        return this.connection.query(
            `
            INSERT INTO
                department
            SET
            ?
            `, department
        );
    };

    createEmployee(first_name, last_name, role_id, manager_id) {
        return this.connection.query(
            `
            INSERT INTO
		        employee
            SET
            ?
            `, { first_name, last_name, role_id, manager_id }
        );
    };

    createRole(title, salary, department_id) {
        return this.connection.query(
            `
            INSERT INTO
		        role
            SET
            ?
            `, { title, salary, department_id }
        );
    };

    
    // -----------------------------
    deleteDepartment(id) {
        return this.connection.query(
            `DELETE FROM
            department
            WHERE
            ?;`, id
            );
    }

    deleteEmployee(id) {
        return this.connection.query(
            `DELETE FROM
            employee
            WHERE
            ?;`, id
            );
    }

    deleteRole(id) {
        return this.connection.query(
            `DELETE FROM
             role
             WHERE
            ?;`, id
             );
    }

// -----------------------------
    updateEmployee(role_id, id) {
        return this.connection.query(
            `UPDATE
            employee
            SET
            role_id = ${role_id}
            WHERE
            employee.id = ${id};`,
        );

    };

};
            
module.exports = new DB(connection)