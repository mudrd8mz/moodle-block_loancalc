// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * @module      block_loancalc/ui
 * @package     block_loancalc
 * @copyright   2016 David Mudrák <david@moodle.com>
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

define(['jquery', 'core/str'], function($, str) {

    "use strict";

    /**
     * Initialize the loan calculator UI.
     *
     * @param {String} formid The ID attribute of the wrapping <form> element
     */
    function init(formid) {
        var calc = $("form#" + formid);

        // jshint devel:true
        console.debug("Initialising the UI for the loan calculator " + formid);

        if (!calc.length) {
            throw new Error("Unable to find loan calculator wrapper ID " + formid);
        }

        calc.find("[data-calculate]").click(function(e) {
            calculate(calc, $(this).data("calculate"));
            e.stopPropagation();
        });
    }

    /**
     * Calculate the parameter value.
     *
     * @param {jQuery} calc loan calculator form
     * @param {String} calculatefield name of the field to calculate
     */
    function calculate(calc, calculatefield) {
        var fields = getFieldValues(calc);

        // Make sure that the other two of the three parameters are provided.
        ["amountofloan", "repaymentamount", "loanterm"].forEach(function(fieldname) {
            var field = calc.find("input[name=" + fieldname + "]");
            field.removeAttr("placeholder");
            if (isNaN(fields[fieldname]) && calculatefield !== fieldname) {
                str.get_string("insertvalue", "block_loancalc").done(function(s) {
                    field.attr("placeholder", s);
                });
            }
        });

        // Make sure that all parameters are available.
        $.each(fields, function(name, value) {
            if (isNaN(value) && name !== calculatefield) {
                throw new Error("Missing value for field " + name);
            }
        });

        var fv = parseFloat("0");
        var np = fields.repaymentfreq * fields.loanterm;
        var pmt = -parseFloat(fields.repaymentamount);
        var ir = ((fields.interestrate / fields.repaymentfreq) / 100);
        var pv = parseFloat(fields.amountofloan);
        var q, q1, q2;

        // jshint devel:true
        console.debug("Calculating value of the field " + calculatefield);
        console.debug(fields);

        if (calculatefield === "amountofloan") {
            if (ir === 0) {
                pv = -(fv + (pmt * np));
            } else {
                q1 = Math.pow(1 + ir, -np);
                q2 = Math.pow(1 + ir, np);
                pv = -(q1 * (fv * ir - pmt + q2 * pmt)) / ir;
            }
            fields.amountofloan = pv;

        } else if (calculatefield === "loanterm") {
            if (ir === 0) {
                if (pmt !== 0) {
                    np = - (fv + pv)/pmt;
                } else {
                    throw new Error("Division by zero");
                }
            } else {
                np = Math.log((-fv * ir + pmt)/(pmt + ir * pv))/ Math.log(1 + ir);
            }

            if (np === 0) {
                throw new Error("Can't compute the Loan term for the present values.");
            } else {
                np = (np / fields.repaymentfreq);
                if (isNaN(np)) {
                    throw new Error("The repayment amount is less than the interest.");
                } else {
                    fields.loanterm = np;
                }
            }

        } else if (calculatefield === "repaymentamount") {
            if (ir === 0) {
                if (np !== 0) {
                    pmt = (fv + pv)/np;
                } else {
                    throw new Error("Division by zero");
                }
            } else {
                q = Math.pow(1 + ir, np);
                pmt = ((ir * (fv + q * pv))/(-1 + q));
            }
            fields.repaymentamount = pmt;
        }

        setFieldValues(calc, fields);
    }

    /**
     * Returns all field values from the given form parsed as floats.
     *
     * @param {jQuery} form
     * @return {Object}
     */
    function getFieldValues(form) {
        var values = {};
        $.each(form.serializeArray(), function (i, field) {
            values[field.name] = parseFloat(field.value);
        });
        return values;
    }

    /**
     * Sets the form fields.
     */
    function setFieldValues(form, fields) {
        $.each(fields, function(name, value) {
            if (name !== "repaymentfreq" && !isNaN(value)) {
                form.find("[name=" + name + "]").val(formatFloat(value));
            }
        });
    }

    function formatFloat(x) {

        if (isNaN(x)) {
            return "";
        }

        var sgn = (x < 0);
        x = Math.abs(x);
        x = Math.floor((x * 100) + 0.5);
        var i = 3;
        var y = "";
        while (((i--) > 0) || (x > 0)) {
            y = (x % 10) + y;
            x = Math.floor(x / 10);
            if(i == 1) {
                y = "." + y;
            }
        }
        if (sgn) {
            y = "-" + y;
        }
        return y;
    }

    return /** @alias module:block_loancalc/ui */ {
        init: init
    };
});
